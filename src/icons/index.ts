const svgs = Object.fromEntries(
    Object.entries(import.meta.glob('./svg/*.svg', { eager: true })).map((entry) => [
        entry[0].split('/').pop()?.split('.').reverse().slice(1).reverse().join('.') || entry[0],
        (entry[1] as { default: Object }).default,
    ])
);
export { svgs };
