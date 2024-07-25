'use server'

import { createClient } from '@/utils/supabase/server'
import CryptoJS from 'crypto-js'

async function fetchCurrentUtcTime(): Promise<number> {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await response.json();
    return Math.floor(new Date(data.datetime).getTime() / 1000);
}

export async function postAuth(
    userCreatedISO: string,
    thresholdTimeSecond: number
) {
    const date = new Date(userCreatedISO);
    const userEpochTime = Math.floor(date.getTime() / 1000);
    const currentTime = await fetchCurrentUtcTime();

    const diffInSeconds = currentTime - userEpochTime;
    const checkThresholdTime = diffInSeconds > thresholdTimeSecond;

    return checkThresholdTime;
}

export async function createUserForDatabase(user: any) {
    // create user in database
    const avatars: string[] = [
        'animal-1',
        'animal-2',
        'animal-3',
        'animal-4',
        'animal-5',
        'animal-6',
        'men-1',
        'men-2',
        'men-3',
        'men-4',
        'men-5',
        'men-6',
        'women-1',
        'women-2',
        'women-3',
        'women-4',
        'women-5',
        'women-6',
    ]
    const md5Tag = CryptoJS.MD5(user.id).toString()
    const data = {
        userID: md5Tag,
        name: user.user_metadata.name,
        profile_pic: avatars[Math.floor(Math.random() * avatars.length)],
        country: null,
        profile_type: 'public',
        user_public_id:
            md5Tag.slice(0, 3) + md5Tag.slice(md5Tag.length - 3, md5Tag.length),
    }

    const supabase = createClient()

    // check if the data is already in the database
    const { data: user_data, error: user_dataError } = await supabase
        .from('user-db')
        .select()
        .eq('userID', md5Tag)

    console.log(user_dataError, data)

    // if the data is not in the database, insert it
    if (user_data && user_data.length === 0) {
        const { data: user_dataInsert, error } = await supabase
            .from('user-db')
            .insert(data)

        console.log(user_dataInsert, error)
    }
}
