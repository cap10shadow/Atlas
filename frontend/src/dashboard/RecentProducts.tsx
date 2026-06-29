import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Product } from "@/products/productTypes";

interface RecentProductsProps {
	products: Product[];
}

export function RecentProducts({ products }: RecentProductsProps) {
	return (
		<Card className="p-0">
			<ul className="divide-y divide-border">
				{products.map((product) => (
					<li key={product.id}>
						<Link
							href={`/products/${product.id}`}
							className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-muted/50"
						>
							<div className="flex items-baseline gap-2">
								<span className="font-medium text-foreground">{product.name}</span>
								<span className="text-xs text-muted-foreground">{product.productCode}</span>
							</div>
							<ChevronRight className="size-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
						</Link>
					</li>
				))}
			</ul>
		</Card>
	);
}
