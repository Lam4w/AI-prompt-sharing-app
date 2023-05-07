'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Profile from "@/components/Profile";

const UserProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const params = useParams();
    const paramsId = params.id;

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${paramsId}/posts`);
            const data = await response.json();
        
            setPosts(data);
        }

        const fetchUser = async () => {
            const response = await fetch(`/api/users/${paramsId}`);
            const data = await response.json();
        
            setUser(data);
        }
    
        if(session?.user.id) {
            fetchPosts();
            fetchUser();
        }
    }, []);

    return (
        <Profile 
            name={user?.username}
            desc={`Welcome to ${user?.username} profile page`}
            data={posts}
        />
    )
}

export default UserProfile;