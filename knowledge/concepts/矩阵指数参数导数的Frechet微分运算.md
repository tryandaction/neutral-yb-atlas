# 矩阵指数参数导数的Frechet微分运算

设 $\mathbf{A}(t)$ 为关于实参数 $t$ 可微的 $n\times n$ 复矩阵。考虑矩阵指数函数 $\mathbf{F}(t)=\exp[\mathbf{A}(t)]$。若 $\mathbf{A}(t)$ 与 $\dot{\mathbf{A}}(t)$ 在参数空间中处处对易，即 $[\mathbf{A}(t),\dot{\mathbf{A}}(t)]=\mathbf{0}$，则导数具有初等形式 $\dot{\mathbf{F}}(t)=\mathbf{F}(t)\dot{\mathbf{A}}(t)$。然而，在一般情形下，$[\mathbf{A},\dot{\mathbf{A}}]\neq\mathbf{0}$，上述等式失效。此时需引入Frechet导数作为该运算的严格数学描述。

## 1 Frechet导数的定义与线性映射性质

令 $\mathcal{M}_n(\mathbb{C})$ 为所有 $n\times n$ 复矩阵构成的赋范线性空间，其上的范数取任意相容矩阵范数。固定矩阵 $\mathbf{X}\in\mathcal{M}_n(\mathbb{C})$，定义映射 $\Phi:\mathcal{M}_n(\mathbb{C})\to\mathcal{M}_n(\mathbb{C})$，$\Phi(\mathbf{Y})=\exp(\mathbf{Y})$。若存在有界线性算子 $\mathrm{D}\Phi|_{\mathbf{X}}:\mathcal{M}_n(\mathbb{C})\to\mathcal{M}_n(\mathbb{C})$，使得对任意扰动 $\mathbf{Y}\in\mathcal{M}_n(\mathbb{C})$，有

$$
\|\exp(\mathbf{X}+\mathbf{Y})-\exp(\mathbf{X})-\mathrm{D}\Phi|_{\mathbf{X}}(\mathbf{Y})\|=o(\|\mathbf{Y}\|),
$$

则称 $\mathrm{D}\Phi|_{\mathbf{X}}$ 为 $\Phi$ 在 $\mathbf{X}$ 处的Frechet导数。对于矩阵指数这一特定映射，该导数通常记作 $L_{\exp}(\mathbf{X},\mathbf{Y})$，并定义为方向导数：

$$
L_{\exp}(\mathbf{X},\mathbf{Y}):=\lim_{\varepsilon\to 0}\frac{\exp(\mathbf{X}+\varepsilon\mathbf{Y})-\exp(\mathbf{X})}{\varepsilon}.
$$

右端极限关于 $\mathbf{Y}$ 是线性的，这是由Frechet导数的本质决定的。该线性性在后续数值计算中具有重要应用。

## 2 积分表达式的级数推导

为获得 $L_{\exp}(\mathbf{X},\mathbf{Y})$ 的闭式解析形式，需从矩阵指数的幂级数定义出发。对于任意 $\varepsilon>0$ 且 $\|\varepsilon\mathbf{Y}\|$ 充分小，$\exp(\mathbf{X}+\varepsilon\mathbf{Y})$ 可展开为绝对收敛的级数：

$$
\exp(\mathbf{X}+\varepsilon\mathbf{Y})=\sum_{m=0}^{\infty}\frac{(\mathbf{X}+\varepsilon\mathbf{Y})^m}{m!}.
$$

对于每个固定的 $m\geq 1$，考察 $(\mathbf{X}+\varepsilon\mathbf{Y})^m$ 关于 $\varepsilon$ 的一阶展开。由于 $\mathbf{X}$ 与 $\mathbf{Y}$ 一般不对易，将乘积完全展开时，$\varepsilon$ 的一次项来源于因子 $\varepsilon\mathbf{Y}$ 出现在 $m$ 个因子序列中的任意位置。具体地：

$$
(\mathbf{X}+\varepsilon\mathbf{Y})^m=\mathbf{X}^m+\varepsilon\sum_{k=0}^{m-1}\mathbf{X}^k\mathbf{Y}\mathbf{X}^{m-1-k}+O(\varepsilon^2),
$$

其中 $k$ 表示因子 $\varepsilon\mathbf{Y}$ 左侧 $\mathbf{X}$ 的个数，右侧则为 $m-1-k$ 个 $\mathbf{X}$。将上式代入指数级数，取 $\varepsilon\to 0$，得到级数形式的Frechet导数：

$$
L_{\exp}(\mathbf{X},\mathbf{Y})=\sum_{m=1}^{\infty}\sum_{k=0}^{m-1}\frac{\mathbf{X}^k\mathbf{Y}\mathbf{X}^{m-1-k}}{m!}.
$$

该双重级数在给定范数下绝对收敛，因为 $\sum_{m=1}^{\infty}\frac{m\|\mathbf{X}\|^{m-1}\|\mathbf{Y}\|}{m!}=\|\mathbf{Y}\|e^{\|\mathbf{X}\|}$ 为收敛上界。

现在引入参数积分以实现从离散求和到连续积分的转化。对任意整数 $k\geq 0$，$l\geq 0$，Beta函数满足

$$
\int_0^1 (1-s)^k s^{l}\,ds=\frac{k!\,l!}{(k+l+1)!}.
$$

令 $l=m-1-k$，则 $k+l+1=m$，因此

$$
\frac{1}{m!}=\frac{1}{k!\,l!}\int_0^1 (1-s)^k s^{l}\,ds.
$$

将上述恒等式代入级数表达式，并在绝对收敛的保证下交换求和与积分次序，得到

$$
L_{\exp}(\mathbf{X},\mathbf{Y})
=\int_0^1 \sum_{m=1}^{\infty}\sum_{k=0}^{m-1}\frac{(1-s)^k s^{m-1-k}}{k!(m-1-k)!}\mathbf{X}^k\mathbf{Y}\mathbf{X}^{m-1-k}\,ds.
$$

令 $l=m-1-k$，内层双重求和变为

$$
\sum_{k=0}^{\infty}\sum_{l=0}^{\infty}\frac{(1-s)^k s^{l}}{k!l!}\mathbf{X}^k\mathbf{Y}\mathbf{X}^{l}
=\left(\sum_{k=0}^{\infty}\frac{(1-s)^k}{k!}\mathbf{X}^k\right)\mathbf{Y}\left(\sum_{l=0}^{\infty}\frac{s^l}{l!}\mathbf{X}^l\right).
$$

注意到两个级数分别收敛于 $e^{(1-s)\mathbf{X}}$ 与 $e^{s\mathbf{X}}$。于是得到Frechet导数的基本积分公式：

$$
\boxed{L_{\exp}(\mathbf{X},\mathbf{Y})=\int_0^1 e^{(1-s)\mathbf{X}}\,\mathbf{Y}\,e^{s\mathbf{X}}\,ds}.
$$

该公式的等价形式可通过左乘 $e^{\mathbf{X}}$ 获得。由于 $e^{\mathbf{X}}e^{-s\mathbf{X}}=e^{(1-s)\mathbf{X}}$，上式也可写作

$$
L_{\exp}(\mathbf{X},\mathbf{Y})=e^{\mathbf{X}}\int_0^1 e^{-s\mathbf{X}}\,\mathbf{Y}\,e^{s\mathbf{X}}\,ds.
$$

这两种形式在不同应用场景中各有利弊。第一形式更便于数值积分，第二形式则凸显了与 $e^{\mathbf{X}}$ 的左乘关系。

## 3 对易条件下的退化情形

考察 $\mathbf{X}$ 与 $\mathbf{Y}$ 对易时的特例。若 $[\mathbf{X},\mathbf{Y}]=\mathbf{0}$，则 $e^{-s\mathbf{X}}$ 与 $\mathbf{Y}$ 对易，且 $e^{-s\mathbf{X}}e^{s\mathbf{X}}=\mathbf{I}$。于是积分表达式中的被积函数退化为

$$
e^{-s\mathbf{X}}\mathbf{Y}e^{s\mathbf{X}}=\mathbf{Y}e^{-s\mathbf{X}}e^{s\mathbf{X}}=\mathbf{Y}.
$$

此时积分直接给出

$$
L_{\exp}(\mathbf{X},\mathbf{Y})=e^{\mathbf{X}}\int_0^1 \mathbf{Y}\,ds=e^{\mathbf{X}}\mathbf{Y}.
$$

同理可得 $L_{\exp}(\mathbf{X},\mathbf{Y})=\mathbf{Y}e^{\mathbf{X}}$，二者在对易条件下完全相同。这解释了为何在标量情形或对易矩阵族中，简单的乘法链式法则成立。但需要强调的是，该退化情形在量子力学中几乎不成立，因为哈密顿量通常不与自身的参数导数对易。

## 4 含参数矩阵的复合求导

设 $\mathbf{X}(\phi)$ 为定义在实参数区间 $\mathcal{I}\subseteq\mathbb{R}$ 上的矩阵值函数，且在 $\phi_0\in\mathcal{I}$ 处可导。定义复合映射 $\phi\mapsto \exp[\mathbf{X}(\phi)]$。由Frechet导数的链式法则以及 $L_{\exp}$ 关于第二个变量的线性性，立即得到

$$
\frac{d}{d\phi}\exp[\mathbf{X}(\phi)]\bigg|_{\phi=\phi_0}
=L_{\exp}\left(\mathbf{X}(\phi_0),\frac{d\mathbf{X}}{d\phi}(\phi_0)\right).
$$

将积分表达式代入，可得显式公式：

$$
\frac{d}{d\phi}\exp[\mathbf{X}(\phi)]
=\int_0^1 \exp[(1-s)\mathbf{X}(\phi)]\,\mathbf{X}'(\phi)\,\exp[s\mathbf{X}(\phi)]\,ds.
$$

该公式对一切使 $\mathbf{X}(\phi)$ 可导的 $\phi$ 成立，无需 $\mathbf{X}(\phi)$ 与 $\mathbf{X}'(\phi)$ 对易。在数值实现中，若需要同时计算矩阵指数及其导数，通常采用增广矩阵技巧而非直接数值积分。

## 5 增广矩阵数值计算技巧

对于给定的 $\mathbf{X},\mathbf{Y}\in\mathcal{M}_n(\mathbb{C})$，构造 $2n\times 2n$ 的分块上三角矩阵

$$
\mathbf{M}=
\begin{pmatrix}
\mathbf{X} & \mathbf{Y}\\
\mathbf{0} & \mathbf{X}
\end{pmatrix}.
$$

计算该矩阵的指数。由于 $\mathbf{M}$ 具有分块上三角结构，其幂次具有以下规律。对任意整数 $m\geq 0$，

$$
\mathbf{M}^m=
\begin{pmatrix}
\mathbf{X}^m & \sum_{k=0}^{m-1}\mathbf{X}^k\mathbf{Y}\mathbf{X}^{m-1-k}\\
\mathbf{0} & \mathbf{X}^m
\end{pmatrix},
$$

其中当 $m=0$ 时右上块为零矩阵。将上式代入指数函数的幂级数，得到

$$
\exp(\mathbf{M})=
\begin{pmatrix}
\exp(\mathbf{X}) & \sum_{m=1}^{\infty}\sum_{k=0}^{m-1}\frac{\mathbf{X}^k\mathbf{Y}\mathbf{X}^{m-1-k}}{m!}\\
\mathbf{0} & \exp(\mathbf{X})
\end{pmatrix}
=
\begin{pmatrix}
e^{\mathbf{X}} & L_{\exp}(\mathbf{X},\mathbf{Y})\\
\mathbf{0} & e^{\mathbf{X}}
\end{pmatrix}.
$$

因此，只需求解一次 $2n$ 维矩阵指数运算，即可从右上分块中同时读出Frechet导数的精确数值。该方法避免了构造积分节点和累加求和的误差累积，在标准数值线性代数库中均有高效实现。

## 6 量子最优控制中的具体应用

在分段常数量子控制问题中，时间被离散为 $N$ 个切片，每个切片长度为 $\Delta t$。第 $j$ 个切片内的系统哈密顿量为 $H_{q,j}$，其依赖于待优化参数 $\phi_j$。该切片的演化算符定义为

$$
U_{q,j}=\exp[-iH_{q,j}\Delta t].
$$

令 $\mathbf{X}=-iH_{q,j}\Delta t$，则 $\mathbf{X}$ 关于 $\phi_j$ 的偏导数为

$$
\frac{\partial \mathbf{X}}{\partial \phi_j}=-i\frac{\partial H_{q,j}}{\partial \phi_j}\Delta t.
$$

直接应用第4节的复合求导公式，得到

$$
\frac{\partial U_{q,j}}{\partial \phi_j}
=L_{\exp}\left(-iH_{q,j}\Delta t,\,-i\frac{\partial H_{q,j}}{\partial \phi_j}\Delta t\right).
$$

将积分表达式显式写出：

$$
\frac{\partial U_{q,j}}{\partial \phi_j}
=\int_0^1 \exp\left[-i(1-s)H_{q,j}\Delta t\right]\left(-i\frac{\partial H_{q,j}}{\partial \phi_j}\Delta t\right)\exp\left[-isH_{q,j}\Delta t\right]\,ds.
$$

利用 $e^{-i(1-s)H\Delta t}=e^{-iH\Delta t}e^{isH\Delta t}=U_{q,j}e^{isH\Delta t}$，上式可改写为

$$
\frac{\partial U_{q,j}}{\partial \phi_j}
=U_{q,j}\int_0^1 e^{isH_{q,j}\Delta t}\left(-i\frac{\partial H_{q,j}}{\partial \phi_j}\Delta t\right)e^{-isH_{q,j}\Delta t}\,ds.
$$

该形式将导数表示为 $U_{q,j}$ 与一个积分算子的乘积，便于在总演化算符 $U_q(T)=U_{q,N}\cdots U_{q,1}$ 的梯度计算中插入相应位置。当计算 $U_q(T)$ 关于 $\phi_j$ 的全导数时，由于 $U_{q,j}$ 位于乘积序列的第 $j$ 个位置，其导数为

$$
\frac{\partial U_q(T)}{\partial \phi_j}
=U_{q,N}\cdots U_{q,j+1}\left(\frac{\partial U_{q,j}}{\partial \phi_j}\right)U_{q,j-1}\cdots U_{q,1}.
$$

上式中 $\partial U_{q,j}/\partial \phi_j$ 必须采用上述Frechet导数公式计算，任何简单的左乘或右乘近似都将破坏梯度方向的幺正保持性，并最终导致梯度优化算法无法正确收敛。该公式构成了GRAPE算法及其变体在量子控制中梯度计算的数学核心。