import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/products/productTypes";
import { ProductLifecycleStatus } from "@/products/productStatus";

interface ProductCardProps {
	product: Product;
	lifecycleStatus: ProductLifecycleStatus;
}

export function ProductCard({ product, lifecycleStatus }: ProductCardProps) {
	return (
		<Link href={`/products/${product.id}`} className="block h-full">
			<Card className="h-full transition-colors hover:border-primary/40 hover:bg-accent/30">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h3 className="text-base font-semibold text-foreground">{product.name}</h3>
						<p className="text-sm text-muted-foreground">{product.productCode}</p>
					</div>
					<Badge variant={lifecycleStatus === "Complete" ? "green" : "gray"}>{lifecycleStatus}</Badge>
				</div>
				{product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
			</Card>
		</Link>
	);
}
