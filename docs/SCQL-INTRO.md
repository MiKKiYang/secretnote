# 进行一次 SCQL Query

下面演示在一台机器上使用 SCQL + SecretNote 来模拟不同参与方完成一次 SCQL Query。

### 准备环境

使用 docker 以 P2P 模式部署 SCQL 系统，可以参考[官网文档](https://www.secretflow.org.cn/zh-CN/docs/scql/0.5.0b2/topics/deployment/how-to-deploy-p2p-cluster)。简单起见，我们直接使用 [scql p2p examples](https://github.com/secretflow/scql/tree/main/examples/p2p-tutorial)。

![p2p-tutorial.jpg](./images/p2p-tutorial.png)

### 创建项目

alice 新建项目。

![project.jpg](./images/scql-project.png)

进入项目，在页面右上角成员区域邀请 bob 加入项目。

![invite.jpg](./images//scql-invite.png)

在 bob 主页刷新后会收到邀请信息。点击同意按钮。

![image.png](./images//scql-notification.png)

此时，alice 和 bob 都可以看到刚才创建的项目。

### 创建数据表

alice 和 bob 分别在自己的项目中创建数据表。

![table1.jpg](./images//scql-table1.png)

![table2.jpg](./images/scql-table2.png)

### 调整 CCL 授权

alice 和 bob 分别在数据表中选择刚才创建的数据表，右键菜单中点击配置 CCL。

alice:

![ccl1.jpg](./images/scql-ccl1.png)

bob:

![ccl2.jpg](./images//scql-ccl2.png)

### 执行 SCQL Query

alice 新建 notebook，在代码区域输入 SQL 查询语句，输出区域会输出查询结果。

```sql
SELECT ta.credit_rank, COUNT(*) AS cnt, AVG(ta.income) AS avg_income, AVG(tb.order_amount) as avg_amount
FROM ta INNER JOIN tb ON ta.ID = tb.ID
WHERE ta.age >= 20 AND ta.age <= 30 AND tb.is_active = 1
GROUP BY ta.credit_rank
```

![sql.jpg](./images//scql-query.png)
