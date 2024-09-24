import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                },
            },
        }
    );

    const { data, error } = await supabase.from("posts").select(`content, user_id, id, created_at, user_profile: user_id (display_name)`);

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}