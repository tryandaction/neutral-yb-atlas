import type { WikiEntry } from './wikiTypes'
import { diagnostic, principle, source, spec, step, t } from './wikiContentHelpers'

export const controlWikiEntries: WikiEntry[] = [
  {
    id: 'fpga', term: t('现场可编程门阵列', 'Field-programmable gate array'), abbreviation: 'FPGA',
    aliases: ['FPGA', '现场可编程门阵列', 'field-programmable gate array', '实时控制器'], category: 'control',
    summary: t('由可重构数字逻辑实现确定性触发、并行状态机、时间戳和低延迟反馈，不依赖通用操作系统调度。', 'Reconfigurable digital logic implements deterministic triggers, parallel state machines, timestamps and low-latency feedback without general-purpose OS scheduling.'),
    role: t('统一实验 shot 时序，触发 AOM、AWG、相机和线圈；接收占据判别并在固定延迟内下发重排或 QEC 动作。', 'Unifies shot timing for AOMs, AWGs, cameras and coils, then receives occupancy decisions and issues rearrangement or QEC actions at fixed latency.'),
    principles: [
      principle('同步时序逻辑', 'Synchronous timing logic', '所有状态转移相对于一个或多个受约束时钟边沿发生。计数器给出离散时间，流水线给出固定周期延迟；跨时钟域信号必须同步或通过异步 FIFO，不能直接连接。', 'State transitions occur on constrained clock edges. Counters provide discrete time and pipelines fixed-cycle latency; signals crossing clock domains require synchronizers or asynchronous FIFOs.'),
      principle('确定性不等于绝对准确', 'Determinism is not absolute accuracy', 'FPGA 可以保证数字事件间的周期数，但连接器、线缆、RF 链、光学执行器和相机曝光仍引入模拟延迟与漂移。因此必须在物理端测量，而不是把 HDL 时间表当作实验时间。', 'An FPGA fixes cycle counts between digital events, but connectors, cables, RF chains, optical actuators and camera exposure add analog latency and drift. Timing must be measured at the physical endpoint.')
    ],
    equations: [{ expression: String.raw`t_k=N_k/f_{\rm clk}+\tau_{\rm IO}+\tau_{\rm chain}`, explanation: t('事件时刻由时钟计数、I/O 延迟和外部执行链延迟共同构成；只有第一项由 FPGA 代码直接规定。', 'Event time combines clock count, I/O latency and external-chain delay; only the first term is directly specified by FPGA code.') }],
    workflow: [
      step('建立公共参考', 'Establish common reference', '选择 10 MHz 或 100 MHz 主参考，验证 PLL 锁定、失锁标志和上电行为。', 'Choose a 10 or 100 MHz master reference and verify PLL lock, unlock flags and startup behavior.', '时钟树、设备时钟域和失锁策略。', 'Clock tree, device clock domains and unlock policy.'),
      step('逐通道延迟标定', 'Calibrate per-channel delay', '同时测 FPGA TTL、AWG/RF 输出、光电响应和相机曝光输出。', 'Measure FPGA TTL, AWG/RF output, optical response and camera exposure output together.', '每通道偏移、抖动、温漂和线缆 ID。', 'Per-channel offset, jitter, thermal drift and cable ID.'),
      step('验证状态机异常路径', 'Verify state-machine exceptions', '注入失锁、相机超时、FIFO 满、设备未就绪和急停，检查输出进入安全状态。', 'Inject unlock, camera timeout, FIFO full, device-not-ready and emergency stop; verify safe outputs.', '异常码、响应延迟和恢复条件。', 'Exception code, response latency and recovery condition.'),
      step('绑定每-shot 记录', 'Bind per-shot record', '在触发前冻结配置哈希、波形版本和标定版本，运行中追加不可变事件与状态快照。', 'Freeze configuration, waveform and calibration hashes before triggering; append immutable events and snapshots during the run.', '可从 shot ID 还原的完整控制契约。', 'A complete control contract recoverable from shot ID.')
    ],
    specifications: [
      spec('时钟分辨率与抖动', 'Timing resolution and jitter', '决定数字边沿可设置粒度，但不代表物理响应。', 'Set digital-edge granularity but not physical response.', '分辨率覆盖最快序列；物理端抖动满足误差预算。', 'Resolution covers fastest sequence; endpoint jitter meets budget.'),
      spec('确定性延迟', 'Deterministic latency', '反馈周期必须有上界而非平均值。', 'Feedback cycles need an upper bound, not an average.', '报告最坏值、异常值和测量位置。', 'Report worst case, outliers and measurement point.'),
      spec('I/O 电平与隔离', 'I/O levels and isolation', '错误电平、地环路和反射会产生假触发。', 'Wrong levels, ground loops and reflections create false triggers.', '每种接口定义电平、终端、方向和安全状态。', 'Define level, termination, direction and safe state per interface.'),
      spec('资源与可维护性', 'Resources and maintainability', '逻辑利用率过高会使时序收敛和升级困难。', 'High utilization makes timing closure and upgrades fragile.', '保留时序余量、版本化寄存器映射和硬件在环测试。', 'Keep timing margin, version register maps and hardware-in-loop tests.')
    ],
    comparison: [
      { option: t('实时 CPU', 'Real-time CPU'), strengths: t('复杂算法、浮点和软件开发效率更高。', 'Better for complex algorithms, floating point and software productivity.'), limitations: t('I/O 并行度和亚微秒确定性通常弱于 FPGA。', 'I/O parallelism and sub-microsecond determinism are usually weaker.'), useWhen: t('CPU 做规划与拟合，FPGA 执行时序关键路径。', 'Use CPU for planning/fits and FPGA for timing-critical execution.') },
      { option: t('GPU', 'GPU'), strengths: t('图像分类和大规模并行计算吞吐高。', 'High throughput for image classification and parallel computation.'), limitations: t('数据搬运和调度尾延迟需要单独约束。', 'Transfer and scheduling tail latency need separate control.'), useWhen: t('GPU 产生占据/路径结果，FPGA 负责确定性触发与安全输出。', 'Use GPU for occupancy/path results and FPGA for deterministic triggers and safe outputs.') }
    ],
    diagnostics: [
      diagnostic('数字时间表正确但原子响应错位', 'Digital schedule is correct but atoms respond late', '外部链延迟、AOM 声学时间、相机曝光窗口或线圈带宽未计入。', 'External-chain delay, AOM acoustic transit, camera exposure window or coil bandwidth is omitted.', '在执行器和探测器物理端同时测量，不只抓 TTL。', 'Probe actuator and detector endpoints together, not TTL alone.'),
      diagnostic('反馈偶发长尾', 'Feedback has intermittent long tails', '跨时钟 FIFO、主机传输、相机缓冲或异常重试。', 'Clock-domain FIFO, host transfer, camera buffer or exception retry.', '逐阶段硬件时间戳并绘制尾延迟，不使用单一平均值。', 'Hardware-timestamp every stage and plot tail latency rather than one mean.')
    ],
    related: ['awg', 'dds', 'scientific-camera', 'aod', 'spam'],
    sources: [source('AMD, Vivado Design Suite Documentation', 'https://docs.amd.com/r/en-US/ug949-vivado-design-methodology')],
  },
  {
    id: 'awg', term: t('任意波形发生器', 'Arbitrary waveform generator'), abbreviation: 'AWG',
    aliases: ['AWG', '任意波形发生器', 'arbitrary waveform generator'], category: 'control',
    summary: t('以离散采样和数模转换输出用户定义的电压/RF 包络，适合生成脉冲整形、扫频和多通道相干控制。', 'Outputs user-defined voltage or RF envelopes through sampled digital-to-analog conversion for pulse shaping, chirps and coherent multichannel control.'),
    role: t('为 AOM/EOM、IQ 混频器、线圈或电极提供振幅、相位和频率随时间变化的控制波形。', 'Drives time-dependent amplitude, phase and frequency through AOM/EOM, IQ mixers, coils or electrodes.'),
    principles: [principle('离散时间重构', 'Discrete-time reconstruction', '数字样本经 DAC、零阶保持和模拟重构滤波得到连续波形。采样率只给出 Nyquist 上限；有效带宽、幅度平坦度、镜像和时钟相噪决定可用控制。', 'Digital samples pass through a DAC, zero-order hold and analog reconstruction filter. Sample rate only gives a Nyquist bound; usable control is set by effective bandwidth, flatness, images and clock phase noise.')],
    equations: [{ expression: String.raw`x_{\rm out}(t)=\left[\sum_n x[n]h_{\rm ZOH}(t-nT_s)\right]*h_{\rm chain}(t)`, explanation: t('实际输出是样本经过 DAC 保持和整条线缆/放大器/执行器传递函数后的结果，因此最优控制必须用实测 h_chain 做预失真或模型约束。', 'The delivered waveform is the sampled sequence filtered by DAC hold and the cable/amplifier/actuator chain, so optimal control must include measured h_chain through predistortion or constraints.') }],
    workflow: [
      step('标定幅相传递', 'Calibrate amplitude and phase transfer', '扫频并测 AWG 端口到执行器监测点的 S21、群延迟和压缩。', 'Sweep frequency and measure S21, group delay and compression from AWG to actuator monitor.', '复数传递函数及适用功率范围。', 'Complex transfer function and valid power range.'),
      step('构建可执行波形', 'Build executable waveform', '从物理目标生成采样序列，应用带宽、幅度、slew rate 和相位连续约束。', 'Generate samples from the physical target with bandwidth, amplitude, slew-rate and phase-continuity constraints.', '波形文件、单位、采样率、触发模式和哈希。', 'Waveform file, units, sample rate, trigger mode and hash.'),
      step('示波器/异频复核', 'Verify by scope or heterodyne', '同时记录触发、末端包络和相位，比较设定与实际。', 'Record trigger, delivered envelope and phase together and compare command to reality.', '幅度误差、相位瞬态、延迟和重复性。', 'Amplitude error, phase transient, latency and repeatability.'),
      step('原子闭环', 'Close with atoms', '用 Rabi、Ramsey 或光移扫描校正无法由电子测量捕获的光学响应。', 'Use Rabi, Ramsey or light-shift scans to correct optical responses not captured electronically.', '波形版本到原子通道的映射。', 'Mapping from waveform version to atomic channel.')
    ],
    specifications: [
      spec('采样率与模拟带宽', 'Sample rate and analog bandwidth', '共同限制脉冲最短特征。', 'Jointly limit shortest pulse features.', '带宽覆盖目标谱且留重构滤波余量。', 'Cover target spectrum with reconstruction-filter margin.'),
      spec('垂直分辨率与 ENOB', 'Vertical resolution and ENOB', '量化噪声和失真影响低幅度控制。', 'Quantization noise and distortion affect low-amplitude control.', '在目标频率和幅度下使用有效位数而非标称位数。', 'Use effective bits at target frequency/amplitude, not nominal bits.'),
      spec('通道同步与时钟', 'Channel synchronization and clock', '相对相位决定 Raman、IQ 和多站点门。', 'Relative phase sets Raman, IQ and multisite gates.', '共享参考，并测跨通道偏斜与重启后相位。', 'Share a reference and measure skew plus phase after restart.'),
      spec('存储与序列器', 'Memory and sequencer', '决定长 shot 和低延迟分支能力。', 'Set long-shot and low-latency branching capability.', '序列长度、分支延迟和上传时间满足实验吞吐。', 'Sequence length, branch latency and upload time meet throughput.')
    ],
    comparison: [{ option: t('DDS 连续合成', 'DDS continuous synthesis'), strengths: t('频率分辨率高、相位连续、适合长 RF 音调和扫频。', 'High frequency resolution and phase continuity suit long RF tones and chirps.'), limitations: t('复杂任意包络和多通道宽带波形受限。', 'Complex arbitrary envelopes and broadband multichannel waveforms are limited.'), useWhen: t('DDS 产生载波/多音，AWG 产生复杂包络或 IQ 基带。', 'Use DDS for carriers/multitone and AWG for complex envelopes or IQ baseband.') }],
    diagnostics: [
      diagnostic('示波器波形正确但原子相位不重复', 'Scope waveform is correct but atomic phase is not repeatable', '未共享参考、触发相位随机、IQ LO 路径或光纤相位漂移。', 'Unshared reference, random trigger phase, IQ LO path or optical-fiber phase drift.', '重启后重复相位测量，检查参考锁定、触发模式和光学异频。', 'Repeat phase measurement after restart; inspect reference lock, trigger mode and optical heterodyne.'),
      diagnostic('短脉冲出现振铃', 'Short pulse rings', '重构滤波、线缆反射、放大器带宽或执行器共振。', 'Reconstruction filter, cable reflection, amplifier bandwidth or actuator resonance.', '分段测传递函数并用不同负载/线缆定位。', 'Measure transfer in sections and vary load/cable to localize.')
    ],
    related: ['fpga', 'dds', 'aom', 'eom', 'rabi-frequency'],
    sources: [source('Keysight, Arbitrary Waveform Generator Fundamentals', 'https://www.keysight.com/us/en/assets/7018-01225/application-notes/5989-2928.pdf')],
  },
  {
    id: 'dds', term: t('直接数字频率合成器', 'Direct digital synthesizer'), abbreviation: 'DDS',
    aliases: ['DDS', '直接数字频率合成器', 'direct digital synthesizer'], category: 'control',
    summary: t('用相位累加器、查找表和 DAC 从参考时钟直接合成相位可控的 RF 正弦波。', 'Synthesizes phase-controlled RF sinusoids directly from a reference clock using a phase accumulator, lookup conversion and DAC.'),
    role: t('驱动 AOD/AOM 的单音、多音和扫频，产生可重复频率跳变，并为多个通道提供共享相位参考。', 'Drives AOD/AOM tones, multitone waveforms and chirps with repeatable frequency changes and shared phase references.'),
    principles: [principle('相位累加', 'Phase accumulation', '每个时钟周期把频率控制字加到有限位宽相位寄存器；相位的最高位映射为正弦幅度。频率分辨率极高，但截断、DAC 非线性和时钟抖动产生杂散。', 'Each clock adds a frequency-tuning word to a finite-width phase register; its upper bits map to sinusoidal amplitude. Frequency resolution is high, but truncation, DAC nonlinearity and clock jitter create spurs.')],
    equations: [{ expression: String.raw`f_{\rm out}=\frac{\mathrm{FTW}}{2^N}f_{\rm clk},\qquad \phi[n+1]=\phi[n]+2\pi f_{\rm out}/f_{\rm clk}`, explanation: t('N 位相位累加器把 FTW 映射为输出频率；同步更新 FTW、相位偏置和幅度字才能得到确定的多通道跳变。', 'An N-bit accumulator maps FTW to frequency. Deterministic multichannel updates require synchronous FTW, phase-offset and amplitude updates.') }],
    workflow: [
      step('参考与同步', 'Reference and synchronization', '所有 DDS 锁到同一主参考，定义同步复位和 I/O update 时刻。', 'Lock all DDS channels to one master and define synchronous reset plus I/O-update timing.', '跨通道相位基线和重启行为。', 'Cross-channel phase baseline and restart behavior.'),
      step('频谱验收', 'Accept spectrum', '在目标频率、幅度和多音数下测相噪、杂散、镜像和互调。', 'Measure phase noise, spurs, images and intermodulation at target frequency, amplitude and tone count.', 'SFDR、相噪积分和禁用频点。', 'SFDR, integrated phase noise and excluded frequencies.'),
      step('执行链标定', 'Calibrate actuation chain', '经放大器、匹配和定向耦合器测正反向功率与延迟。', 'Measure forward/reflected power and delay through amplifier, matching and directional coupler.', 'DDS 字到 AOD/AOM 光学输出的 LUT。', 'LUT from DDS words to AOD/AOM optical output.'),
      step('相位连续跳变测试', 'Test phase-continuous updates', '执行频率/幅度切换并异频测瞬时相位。', 'Execute frequency/amplitude changes and heterodyne the instantaneous phase.', '更新延迟、相位跳变和可重复性。', 'Update latency, phase discontinuity and repeatability.')
    ],
    specifications: [
      spec('参考时钟相噪', 'Reference-clock phase noise', '直接转移到 RF 并影响激光/原子相位。', 'Transfers to RF and affects optical/atomic phase.', '从主参考到输出积分测量，不只采用芯片数据。', 'Integrate from master reference to output, not chip data alone.'),
      spec('SFDR 与杂散地图', 'SFDR and spur map', '杂散可生成非目标光镊或旁带。', 'Spurs can create unintended tweezers or sidebands.', '覆盖所有工作频点、幅度和多音组合。', 'Cover all operating frequencies, amplitudes and multitone combinations.'),
      spec('更新延迟', 'Update latency', '决定快速重排和脉冲相位。', 'Sets fast rearrangement and pulse phase.', '与 FPGA 触发联合测量并绑定固件版本。', 'Measure jointly with FPGA trigger and bind to firmware version.'),
      spec('多通道相干', 'Multichannel coherence', '决定二维 AOD 和并行站点的相对相位。', 'Sets relative phase in 2D AOD and parallel sites.', '共享时钟、同步复位并跨重启验证。', 'Use shared clock, synchronous reset and verify across restarts.')
    ],
    comparison: [{ option: t('AWG 宽带波形', 'AWG broadband waveform'), strengths: t('可输出任意包络、瞬态和多载波基带。', 'Outputs arbitrary envelopes, transients and multicarrier baseband.'), limitations: t('长时间频率分辨率、内存和相位重启行为需单独设计。', 'Long-term frequency resolution, memory and restart phase need design.'), useWhen: t('DDS 负责稳定载波和扫频，AWG 负责复杂包络。', 'Use DDS for stable carriers/chirps and AWG for complex envelopes.') }],
    diagnostics: [
      diagnostic('某些位置光镊异常变浅', 'Tweezers are anomalously shallow at certain positions', 'DDS 杂散、AOD 效率谷、RF 匹配或频点相关放大增益。', 'DDS spur, AOD efficiency dip, RF mismatch or frequency-dependent amplifier gain.', '联合查看 RF 频谱、正反向功率、光功率和阱频。', 'Inspect RF spectrum, forward/reflected power, optical power and trap frequency together.'),
      diagnostic('每次上电相位不同', 'Phase differs after each power cycle', '未同步清零相位累加器或 I/O update 不一致。', 'Phase accumulator is not synchronously reset or I/O update is inconsistent.', '记录复位、同步时钟和更新边沿并做异频重复测试。', 'Record reset, sync clock and update edge; repeat heterodyne test.')
    ],
    related: ['fpga', 'awg', 'aod', 'aom'],
    sources: [source('Analog Devices, All About Direct Digital Synthesis', 'https://www.analog.com/en/resources/analog-dialogue/articles/all-about-direct-digital-synthesis.html')],
  },
]
