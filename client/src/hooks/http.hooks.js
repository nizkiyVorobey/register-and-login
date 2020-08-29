import React, { useState, useCallback } from "react";

export const useHTTP = () => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const request = useCallback(async(url = '', method = 'GET', body = {}, headers) => {
        setError(true)
        try {
            const response = await fetch(url, {
                method,
                body: body,
                headers
            })

            const data = await response.json();

            if (!response.ok) {
                throw data
            }

            console.log('DATA', data);
            return data

        } catch (err) {
            setError(false)
            setError(err.message)
            throw err
        }
    }, [])

    const clearError = () => setError(null)


    return { loading, error, request, clearError }
}