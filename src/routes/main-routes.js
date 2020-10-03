import { SwaggerRouter } from 'koa-swagger-decorator';
import * as path from 'path'

const router = new SwaggerRouter();

// swagger docs avaliable at http://localhost:3000/swagger-html
router.swagger({
    title: '一个demo系统',
    description: 'API DOC',
    version: '1.0.0'
});

// 查找对应目录下的controller类
router.mapDir(path.resolve(__dirname, '../controllers/'));

export default router;