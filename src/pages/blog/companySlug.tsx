import { useEffect, useState } from "react";
import { fetchAPI } from "../../utils/fetch-api";
import CompanyPost from "../../views/company-post";
import { useParams } from "react-router-dom";

async function getPostBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: {
            cover: { fields: ['url'] },
            authorsBio: { populate: '*' },
            category: { fields: ['name'] },
            blocks: { populate: '*' },
        },
    };
    // const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject);
    console.log("response", response)
    return response;
}

async function getMetaData(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: { seo: { populate: '*' } },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<any> {
    const meta = await getMetaData(params.slug);
    const metadata = meta[0].attributes.seo;

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    };
}

export default function CompanyPostRoute() {
    const { slug } = useParams();
    const [data, setData] = useState<any>({})

    useEffect(() => {
        (async () => {
            if (!slug) return <></>;
            console.log(slug)
            const data = await getPostBySlug(slug);
            setData(data);
        })()
    }, [])
    if (!data.data || data.data.length === 0) return <h2>no post found</h2>;
    else return <CompanyPost data={data.data[0]} />;
}


export async function generateStaticParams() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const articleResponse = await fetchAPI(
        path,
        {
            populate: ['category'],
        },
        options
    );

    return articleResponse.data.map(
        (article: {
            attributes: {
                slug: string;
                category: {
                    slug: string;
                };
            };
        }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
    );
}