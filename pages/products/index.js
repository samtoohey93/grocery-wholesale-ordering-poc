import Products from "@components/Products/Products";
import styles from "@styles/products/ProductsPage.module.css";

const ProductsPage = ({ products }) => {
  return (
    <main>
      <section className={styles.Products}>
        <Products products={products} />
      </section>
    </main>
  );
};

export const getStaticProps = async () => {
  // Fetch the products
  const data = await shopifyClient.product.fetchAll();

  // Parse the data
  const products = JSON.parse(JSON.stringify(data));

  return {
    props: {
      products,
    },
  };
};

export default ProductsPage;
