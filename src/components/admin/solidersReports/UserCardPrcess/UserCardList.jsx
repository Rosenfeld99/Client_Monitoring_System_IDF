import React from 'react'

const UserCardList = () => {
    const usersTests = [
        {
            username: "test new user 10",
            id: "njckdnckjcn",
            report: "מטווחים",
            name: "בסיס",
            value: "base",
        },
        {
            username: "נהוראי",
            id: "njckdnckjcn",
            report: "תפילה",
            name: "בסיס",
            value: "area",
        },
    ];

    const UserCard = ({ item }) => (
        <div className="relative w-60 h-80 bg-white shadow-lg rounded-3xl flex flex-col items-center justify-center p-4">
            <div className="absolute w-36 h-36 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-4xl shadow-md">
                {/* Replace innerIcon(item?.value) with actual icon */}
                <div>{/* innerIcon(item?.value) */}Icon</div>
            </div>
            <div className="mt-36 text-center">
                <div className="text-xl font-bold">{item.username}</div>
                <div className="text-lg font-semibold">{item.report}</div>
            </div>
            <button
                onClick={() =>
                    navigation(
                        `/startReport/${item.value}?&access=manager&report=grup&users=${encodeURIComponent(
                            JSON.stringify(usersName)
                        )}`
                    )
                }
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
                סגור תהליך
            </button>
        </div>)
    return (
        <div className="flex flex-wrap items-center justify-center gap-y-10 gap-6">
            {usersTests.map((item, index) => (
                <UserCard key={index} item={item} />
            ))}
        </div>
    )
}

export default UserCardList


