import { converters } from '../utils/converters';
import { z } from 'zod';

const ZodStoredEntity = z.object({
  type: z.string(),
  data: z.string()
}).strict();

type StoredEntity = z.infer<typeof ZodStoredEntity>;

function isStoredEntity(value: unknown): value is StoredEntity {
  return ZodStoredEntity.safeParse(value).success;
}

function useLocalStorage() {

  const storagePrefix = 'my5vStorage';

  function storeData(key: string, data: unknown): void {
    const storedEntity: StoredEntity = {
      type: typeof data,
      data: ''
    };
    if (storedEntity.type === 'object') {
      storedEntity.data = JSON.stringify(data);
    } else {
      storedEntity.data = converters.toString(data) || '';
    }
    if (storedEntity.data) {
      window.localStorage.setItem(`${storagePrefix}-${key}`, JSON.stringify(storedEntity));
    }
  }

  function getData(key: string) {
    const storedEntity = JSON.parse(window.localStorage.getItem(`${storagePrefix}-${key}`) || '{}');
    if (isStoredEntity(storedEntity)) {
      if (storedEntity.type === 'object') {
        return JSON.parse(storedEntity.data);
      }
      return storedEntity.data;
    }
  }

  return {
    storeData, getData
  };
}

export default useLocalStorage;
