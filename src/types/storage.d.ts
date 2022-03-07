declare module "@storage" {
    export function open(filename: string, allowWrite?: boolean): Storage | null;
};

type IndexType = "integer" | "long" | "float" | "date" | "string";
interface Storage {
    close();
    commit();
    createIndex(type: IndexType, unique?: bool): Index | null;
}

interface Index extends Iterable {
    readonly length: number;
    readonly unique: boolean;
    readonly type: string;
    set(key, obj, replace?: boolean): boolean;
    get(key);
    delete(key, obj?): boolean;
    select(minKey, maxKey, ascending?, startInclusive?, endInclusive?): Iterator
    clear();
}