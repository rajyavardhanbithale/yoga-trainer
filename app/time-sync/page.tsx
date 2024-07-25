import axios from "axios"

export default async function Page() {

    const response = await axios.get(
        'https://worldtimeapi.org/api/timezone/Etc/UTC'
    )

    return (
        <>
            <span className="text-white">
                {JSON.stringify(response.data)}

            </span>
        </>
    )
}