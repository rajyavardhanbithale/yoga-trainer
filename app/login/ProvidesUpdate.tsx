import { FaApple, FaFacebook } from 'react-icons/fa'

export default function ProviderUpdate(t: any, provider: string) {
    return (
        <>
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            {provider === 'facebook' && (
                                <FaFacebook className="inline-flex text-3xl text-blue-500" />
                            )}
                            {provider === 'apple' && (
                                <FaApple className="inline-flex text-2xl text-slate-600" />
                            )}
                        </div>
                        <div className="ml-3 flex-1">
                            {provider === 'facebook' && (
                                <>
                                    <p className="text-sm font-medium text-gray-900">
                                        Facebook Login
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Facebook login method coming soon
                                    </p>
                                </>
                            )}
                            {provider === 'apple' && (
                                <>
                                    <p className="text-sm font-medium text-gray-900">
                                        Apple ID Login
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Apple ID login method coming soon
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
