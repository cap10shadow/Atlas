import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeaderProvider } from "@/components/layout/PageHeaderContext";
import { Sidebar } from "@/components/layout/Sidebar";

interface AppShellProps {
	children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
	return (
		<PageHeaderProvider>
			<div className="flex h-screen flex-col">
				<Header />
				<div className="flex flex-1 overflow-hidden">
					<Sidebar />
					<main className="flex-1 overflow-y-auto">
						<div className="mx-auto w-full max-w-[1440px] p-4 md:p-6 lg:p-8">{children}</div>
					</main>
				</div>
				<Footer />
			</div>
		</PageHeaderProvider>
	);
}
