import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                },
            },
        }
    );

    // Get the content from the form data
    const formData = await request.formData();
    const content = formData.get("content") as string;
    console.log("Content:", content);

    const moderationResponse = await fetch("http://127.0.0.1:8000/classify-text/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
    });

    const moderationResult = await moderationResponse.json();
    const classification = moderationResult.classification;

    if (classification === "1") {
        return NextResponse.json({
            message: "Your post contains offensive language and hence, will not be accepted."
        });
    } else if (classification === "0") {
        return NextResponse.json({
            message: "Your post contains hate speech, which violates our policies. Please refrain from inciting hatred."
        });
    } else if (classification === "2") {
        const { data, error } = await supabase.from("posts").insert([
            { content },
        ]);

        if (error) {
            return NextResponse.error();
        }

        return NextResponse.json({data}, {status: 201});
    }

    return NextResponse.error();
}
