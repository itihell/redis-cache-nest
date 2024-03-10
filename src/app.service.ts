import { Injectable, Inject } from '@nestjs/common';
import { CacheManager } from 'cache-manager';
@Injectable()
export class AppService {
  constructor(
    @Inject('CACHE_MANAGER') private readonly cacheManager: CacheManager,
  ) {}

  async getHello(clave: string) {
    const data = await this.cacheManager.get(clave);

    return data;
  }

  async setCache(clave: string, valor: string) {
    // Si definimos un tiempo de vida del cache en el módulo,
    // podemos usar el siguiente método
    await this.cacheManager.set(clave, valor, { ttl: 0 });
    return 'Cache seteado';
  }
}
