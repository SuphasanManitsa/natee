import Product from "@/app/components/product"

export default function page({ params }) {
    return (
        <div>
            <Product productId={params.slate} />
        </div>
    )
}