import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={index} className={styles["breadcrumb-item"]}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
