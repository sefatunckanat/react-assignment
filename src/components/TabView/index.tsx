import React, { ReactNode, useState } from "react";
import styles from "./TabView.module.sass";

interface ITab {
	label: string;
	content: ReactNode;
}

interface ITabView {
	defaultIndex?: number;
	tabs: ITab[];
}

export default function TabView({ defaultIndex = 0, tabs = [] }: ITabView) {
	const [tabIndex, setTabIndex] = useState(defaultIndex);

	const activeTab = tabs[tabIndex];

	if (!activeTab) <></>;

	return (
		<div className={styles.TabView}>
			<div className={styles.TabView__tabs}>
				{tabs.map((tab, index) => (
					<div
						onClick={() => {
							setTabIndex(index);
						}}
						key={index}
						className={[
							styles.TabView__tabs__tab,
							index === tabIndex ? styles.TabView__tabs__tab__active : "",
						].join(" ")}
					>
						{tab.label}
					</div>
				))}
			</div>
			<div className={styles.TabView__content}>{activeTab.content}</div>
		</div>
	);
}
