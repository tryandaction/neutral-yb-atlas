# CZ and CNOT gate

## 一、单量子比特旋转门：Hadamard门的算符结构与物理生成

Hadamard门

$$
H=\frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

在计算基$\{|0\rangle,|1\rangle\}$下执行从$Z$基到$X$基的映射：

$$
H|0\rangle=|+\rangle=\frac{|0\rangle+|1\rangle}{\sqrt{2}},\quad
H|1\rangle=|-\rangle=\frac{|0\rangle-|1\rangle}{\sqrt{2}}.
$$

该矩阵满足$H^2=I$，且$H\sigma_x H=\sigma_z$，$H\sigma_z H=\sigma_x$。这一相似变换关系是受控门之间等价的代数根源。在泡利算符张成的李代数中，$H$对应于绕布洛赫球面上$(\hat{x}+\hat{z})/\sqrt{2}$轴旋转$\pi$，其旋转算符表达式为

$$
R_{\hat{n}}(\pi)=\cos\frac{\pi}{2}I-i\sin\frac{\pi}{2}(\hat{n}\cdot\vec{\sigma})=-i\frac{\sigma_x+\sigma_z}{\sqrt{2}}=-iH.
$$

全局相位$-i$不改变投影测量结果，故实验上实现的$-iH$与$H$等价。

中性原子体系中$H$门的物理生成依赖基态超精细能级$|0\rangle=|F=1,m_F=0\rangle$与$|1\rangle=|F=2,m_F=0\rangle$之间的相干驱动。两能级间隔$\omega_{01}=2\pi\times6.834\text{ GHz}$。单纯施加共振微波场产生哈密顿量$H_{\rm MW}=(\hbar\Omega/2)\sigma_x$，仅能实现绕$X$轴的旋转，无法直接得到$H$。实际采用以下两种路径之一：

（1）**拉曼双光子跃迁**。两束相位锁定的远失谐激光通过虚中间态耦合$|0\rangle$与$|1\rangle$，有效哈密顿量写作

$$
H_{\rm Raman}=\frac{\hbar\Omega}{2}\left(\cos\phi\,\sigma_x+\sin\phi\,\sigma_y\right)+\frac{\hbar\Delta}{2}\sigma_z,
$$

其中$\phi$为两束光的相对相位，$\Delta$为交流斯塔克位移引入的有效纵向场。调节驱动参数使$\Omega=\Delta$且$\phi=0$，总哈密顿量正比于$\sigma_x+\sigma_z$，演化时间$t=\pi/\Omega$时给出$-iH$。

（2）**微波复合脉冲序列**。仅使用$X$轴和$Y$轴旋转，通过

$$
R_x(\pi/2)\,R_y(\pi)\,R_x(\pi/2)
$$

合成$H$门，其中$R_y$由改变微波相位获得。该方案避免拉曼光路中额外的相位噪声来源，但对脉冲面积误差的累积效应更敏感。

---

## 二、受控门的矩阵分解与作用子空间

双量子比特系统的计算基取为$|00\rangle,|01\rangle,|10\rangle,|11\rangle$。将控制量子比特（索引$c$）与目标量子比特（索引$t$）的张量积空间按控制比特的本征值分解：

$$
CNOT_{c\to t}=|0\rangle_c\langle0|\otimes I_t+|1\rangle_c\langle1|\otimes X_t
=\begin{pmatrix}I&0\\0&X\end{pmatrix}.
$$

$X$矩阵作用于目标比特的子空间。展开为$4\times4$矩阵：

$$
CNOT=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
0&0&0&1\\
0&0&1&0
\end{pmatrix}.
$$

CZ门以完全相同的方式定义，仅将$X$替换为$Z$：

$$
CZ_{c,t}=|0\rangle_c\langle0|\otimes I_t+|1\rangle_c\langle1|\otimes Z_t
=\begin{pmatrix}I&0\\0&Z\end{pmatrix},
$$

其展开形式为

$$
CZ=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
0&0&0&-1
\end{pmatrix}.
$$

CZ门在交换两个量子比特的索引后保持不变，因为$Z$矩阵对角且两个$|1\rangle$态的关联完全对称。CNOT门不具备该对称性：交换控制与目标后得到的矩阵为

$$
CNOT_{t\to c}=
\begin{pmatrix}
1&0&0&0\\
0&0&0&1\\
0&0&1&0\\
0&1&0&0
\end{pmatrix},
$$

两者仅相差一个SWAP门共轭。

受控门的幺正性由其子矩阵的幺正性保证：$X^2=Z^2=I$。两个门的纠缠能力源于它们能将可分离态映射为纠缠态。输入态$|+\rangle_c\otimes|0\rangle_t$经CNOT作用：

$$
CNOT\left[\frac{1}{\sqrt{2}}(|0\rangle+|1\rangle)\otimes|0\rangle\right]
=\frac{1}{\sqrt{2}}(|00\rangle+|11\rangle),
$$

右端为最大纠缠贝尔态，其并发度（concurrence）为1。CZ门作用于$|+\rangle\otimes|+\rangle$：

$$
CZ\left[\frac{1}{2}(|0\rangle+|1\rangle)\otimes(|0\rangle+|1\rangle)\right]
=\frac{1}{2}(|00\rangle+|01\rangle+|10\rangle-|11\rangle),
$$

该态与$|00\rangle+|11\rangle$仅差局域幺正变换，纠缠熵相同。

---

## 三、Hadamard变换诱导的受控门等价关系

将相似变换$HXH=Z$和$HZH=X$嵌入张量积空间，在目标比特两侧作用$H$门：

$$
(I\otimes H)\,CZ\,(I\otimes H)
=
\begin{pmatrix}I&0\\0&HZH\end{pmatrix}
=
\begin{pmatrix}I&0\\0&X\end{pmatrix}
=CNOT.
$$

反过来，

$$
(I\otimes H)\,CNOT\,(I\otimes H)=CZ.
$$

该等价关系在量子电路编译中具有实际意义：若硬件原生支持CZ门而算法需要CNOT，只需在目标比特上包裹一对$H$门。单比特$H$门的保真度通常高于双比特门，因此这种转换的开销仅限于额外两个单比特操作的保真度乘积。

更一般地，对于任意单比特幺正矩阵$U$，受控-$U$门定义为$\text{diag}(I,U)$。由于$U$的任意性，CNOT与CZ分别是受控-$X$和受控-$Z$的特殊情形。所有受控-$U$门可通过CNOT与单比特门分解，但CZ与CNOT之间的直接变换仅需$H$门，不依赖其他多比特操作。

---

## 四、中性原子体系中CZ门的里德伯阻塞实现

中性原子量子处理器（如$^{87}$Rb或$^{133}$Cs）将原子囚禁于光镊阵列中，计算态编码在基态超精细能级$|0\rangle$和$|1\rangle$。里德伯态$|r\rangle$（主量子数$n\sim60$—$100$）通过双光子或单光子激发与$|1\rangle$共振耦合，拉比频率为$\Omega$。两个原子间距$R$时，双里德伯态$|rr\rangle$的能量因范德瓦尔斯相互作用发生移动：

$$
V_{vdW}=\frac{C_6}{R^6}.
$$

$C_6$与$n^{11}$成正比，在$R\simeq5\text{ }\mu\text{m}$时$V_{vdW}/\hbar$可达数百MHz至GHz量级。阻塞条件要求$V_{vdW}\gg\hbar\Omega$，此时双激发态$|rr\rangle$在频谱上远离共振，系统无法同时将两个原子从$|1\rangle$激发至$|r\rangle$。

标准CZ门脉冲序列采用共振$2\pi$脉冲方案（Isenhower et al., Phys. Rev. Lett. 104, 010503, 2010）。设激光同时作用于两个原子，激发算符为$\sigma_i^+ = |r_i\rangle\langle1_i|$，单原子哈密顿量在旋转波近似下为

$$
H_i=\frac{\hbar\Omega}{2}\left(\sigma_i^+ + \sigma_i^-\right).
$$

总哈密顿量包含相互作用项：

$$
H_{\rm tot}=\sum_{i=1}^2\frac{\hbar\Omega}{2}\left(\sigma_i^+ + \sigma_i^-\right)
+V_{vdW}\,|rr\rangle\langle rr|.
$$

对系统施加持续时间为$t_{2\pi}=2\pi/\Omega$的共振脉冲（脉冲面积为$2\pi$）。按总激发数将态空间分解为三个不变子空间：

**零激发子空间**$\{|00\rangle\}$。无耦合，演化算子为$I$。

**单激发子空间**$\{|10\rangle,|01\rangle,|r0\rangle,|0r\rangle\}$。双里德伯态不参与，$V_{vdW}$项贡献为零。两个原子各自独立执行$|1\rangle\leftrightarrow|r\rangle$的共振拉比振荡。$2\pi$脉冲对每个单激发态施加的演化算子为$e^{-i\pi\sigma_y}=-I$，因此

$$
|10\rangle\to-|10\rangle,\quad |01\rangle\to-|01\rangle.
$$

**双激发子空间**$\{|11\rangle,|r1\rangle,|1r\rangle,|rr\rangle\}$。由于$|rr\rangle$的能量偏移$V_{vdW}\gg\hbar\Omega$，该子空间的有效动力学可绝热消除高能态$|rr\rangle$。在阻塞极限下，$|11\rangle$无法布居到任何里德伯成分，其有效哈密顿量近似为零（或产生一个可忽略的交流斯塔克相位$\phi_{\rm AC}\simeq\pi\Omega/V_{vdW}$，实验中可校准扣除）。故

$$
|11\rangle\to|11\rangle.
$$

三子空间联合给出酉矩阵

$$
U_{2\pi}^{\rm block}=
\begin{pmatrix}
1&0&0&0\\
0&-1&0&0\\
0&0&-1&0\\
0&0&0&1
\end{pmatrix}
=Z\otimes Z.
$$

该结果不是标准CZ，而是两个单比特$Z$门的张量积。通过施加单比特相位门$Z\otimes I$或$I\otimes Z$补偿其中任意一个$|1\rangle$态的相位：

$$
(Z\otimes I)\,(Z\otimes Z)=I\otimes Z,
$$

该操作不改变双激发态的相对符号。实际中，选择在其中一个量子比特上施加微波$\pi$脉冲实现$Z$门，最终得到

$$
CZ=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
0&0&0&-1
\end{pmatrix}.
$$

---

## 五、CNOT门的合成脉冲序列

将第四节得到的CZ门与第三节的等价关系结合。目标原子$t$上的$H$门采用第一节所述的拉曼或复合脉冲方案实现。完整操作序列为：

（1）对目标量子比特施加$H_t$；

（2）执行上述里德伯阻塞$2\pi$脉冲序列及单比特相位补偿（即CZ门）；

（3）再次对目标量子比特施加$H_t$。

总演化算子：

$$
(I\otimes H_t)\,CZ_{c,t}\,(I\otimes H_t)=CNOT_{c\to t}.
$$

该序列中所有$H$门均在基态流形内完成，不涉及里德伯激发，因此不受$V_{vdW}$涨落影响。CNOT的保真度由CZ保真度与两次$H$门保真度的乘积决定。若CZ保真度为$99.5\%$，$H$门保真度为$99.9\%$，则CNOT保真度约为$99.3\%$。

---

## 六、退相干通道与误差预算

里德伯阻塞门的主要误差来源如下：

**里德伯态有限寿命**。$|r\rangle$的辐射寿命$\tau_r\sim100\text{ }\mu\text{s}$（室温下黑体辐射限制），$2\pi$脉冲持续时间$t_{2\pi}\simeq2\pi/\Omega$。取$\Omega/2\pi=10\text{ MHz}$，$t_{2\pi}=100\text{ ns}$，远小于$\tau_r$，故衰变误差$\sim t_{2\pi}/\tau_r\simeq10^{-3}$量级。增大$\Omega$可进一步抑制该误差，但受限于激光功率和中间态自发辐射。

**范德瓦尔斯相互作用涨落**。原子在光镊中的残余热运动导致间距$R$发生微小变化，$V_{vdW}=C_6/R^6$的相对涨落为$6\,\delta R/R$。若$\delta R/R\sim1\%$，则相位误差$\delta\phi\sim0.06$ rad，保真度损失约$0.1\%$。解决途径包括将原子冷却至三维振动基态（拉曼边带冷却）或采用绝热脉冲整形，使门对$R$的依赖从$R^{-6}$降为$R^{-3}$。

**激光相位噪声**。共振脉冲的旋转轴由激发光的瞬时相位决定。若两束激发光（双光子方案）的相对相位在脉冲间发生扩散，则$2\pi$脉冲不能精确回退单激发态，造成剩余布居泄漏。采用主动相位稳定（光纤频率梳锁相）可将相位抖动控制在$<0.01\text{ rad}^2$以内。

**非绝热泄漏**。有限阻塞比$\eta=V_{vdW}/(\hbar\Omega)$下，$|11\rangle$在脉冲期间获得非零交流斯塔克相位$\phi_{\rm AC}\simeq\pi/\eta$，且伴随极小概率的里德伯布居。该误差随$\eta$增大而二次方下降。实验选择$\eta>100$，对应$\phi_{\rm AC}<0.03$ rad。

**单比特门误差**。$H$门在微波驱动下主要受强度不均匀性影响。脉冲面积误差$\delta\Omega/\Omega\sim0.5\%$产生的保真度损失约为$(\delta\Omega/\Omega)^2\sim2.5\times10^{-5}$，相对于双比特门误差可忽略。

当前主流实验（如哈佛大学Lukin课题组、加州理工学院Endres课题组）报道的CZ门保真度在$0.995$—$0.998$范围内，受限于里德伯态寿命和激光相位噪声的综合作用。随着低温环境（$<4\text{ K}$）的引入以抑制黑体辐射，以及激光功率的提升，该数值正在逼近表面码容错阈值$0.99$—$0.999$。

---

## 参考文献

Isenhower, L., et al. (2010). Demonstration of a neutral atom controlled-NOT quantum gate. *Physical Review Letters*, 104, 010503.

Saffman, M., Walker, T. G., & Mølmer, K. (2010). Quantum information with Rydberg atoms. *Reviews of Modern Physics*, 82, 2313.

Jaksch, D., et al. (2000). Fast quantum gates for neutral atoms. *Physical Review Letters*, 85, 2208.

Graham, T. M., et al. (2019). Rydberg-mediated entanglement in a two-dimensional neutral atom qubit array. *Physical Review Letters*, 123, 230501.