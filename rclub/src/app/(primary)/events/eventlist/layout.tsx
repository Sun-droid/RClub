import Link from 'next/link'
import {posts} from '@/app/types/types'
import React from "react";
import Page from '@/app/components/t1'
import CardData from './page'

export default function EventsListLayout() {

    return (
        <div className="flex flex-col min-h-fit mx-auto max-w-2xl px-4 pt-8 pb-16">
            <div className="flex-grow">
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/tickets/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Page repo={{
                name: '',
                stargazers_count: 0
            }}/>
            <CardData/>
        </div>
    );
}