import { useEffect, useState } from "react";

const { REACT_APP_SPACE_ID, REACT_APP_ACCESS_TOKEN } = process.env

function useContentful(query) {
    let [data, setData] = useState(null);
    let [errors, setErrors] = useState(null);


    useEffect(() => {
        window
            .fetch("https://graphql.contentful.com/content/v1/spaces/7ohxz0hombxa/environments/master",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify({ query }),
                }
            )
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) setErrors(errors)
                if (data) setData(data)
            })
            .catch(error => setErrors([error]))
    }, [query])

    return { data, errors };
}

export default useContentful