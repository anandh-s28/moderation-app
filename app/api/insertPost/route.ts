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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                },
            },
        }
    );

    const formData = await request.formData();
    const content = formData.get("content");
    console.log(content);

    const { data, error } = await supabase.from("posts").insert([
        {
            content,
        },
    ]);

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}