import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = () => {
    const [data, setData] = useState([]); // به جای null یک آرایه خالی
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ghafaseha.ir/api/categoryAdvertises/${categoryId}');
                console.log(response.data); // بررسی داده‌ها
                setData(response.data);
            } catch (error) {
                console.error(error); // گزارش خطا
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>در حال بارگذاری...</p>;
    }

    if (error) {
        return <p>خطا: {error.message}</p>;
    }

    if (!Array.isArray(data) || data.length === 0) {
        return <p>هیچ داده‌ای برای نمایش وجود ندارد.</p>;
    }

    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>{item.title ? item.title : 'عنوان موجود نیست'}</div>
            ))}
        </div>
    );
};

export default FetchData;