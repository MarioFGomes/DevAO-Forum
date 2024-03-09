
/**
 * Make same property optional on type
 * 
 * 
 */
export type Optional<T,k extends keyof T> = Pick<Partial<T>,k> & Omit<T,k>