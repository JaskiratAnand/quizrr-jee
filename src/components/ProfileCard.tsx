

export default async function ProfileCard ({name, email, createdOn}: {
    name: string;
    email: string;
    createdOn: string;
}) {
    

    return (
        <section className="flex font-medium items-center justify-center h-[90vh]">
            <section className="w-96 mx-auto bg-[#202020] bg-opacity-60 rounded-2xl px-8 py-12 shadow-lg backdrop-blur">
                <div className="mt-3">
                    <h2 className="text-white font-bold text-2xl tracking-wide">{name}</h2>
                </div>
                <p className="text-emerald-400 font-semibold mt-2.5" >
                    {email}
                </p>
                <p className="mt-5">
                    created on: <span className="text-gray-400">{createdOn}</span>
                </p>
            </section>
        </section>
    )
}