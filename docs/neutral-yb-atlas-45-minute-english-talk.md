# From Atomic Dynamics to Fault-Tolerant Computation with Neutral $^{171}$Yb

**Format:** 45-minute English guided talk using the Neutral Yb Atlas website
**Audience:** learners comfortable with undergraduate physics and linear algebra, beginning quantum computing
**Speaking rate:** approximately 115--125 words per minute; the scripted text is deliberately paced for explanation while the figures remain on screen.

## Route and timing

| Time | Website area | Question answered |
|---:|---|---|
| 0:00--3:00 | Overview | What must a physical device do before it counts as a computation? |
| 3:00--11:00 | Computation principles | How do state, dynamics, measurement, and error correction form one physical computation? |
| 11:00--19:00 | Yb platform | Why neutral atoms, and why $^{171}$Yb? |
| 19:00--28:00 | Quantum gates and theory | How does a target unitary become an experimentally testable gate? |
| 28:00--37:00 | Experimental systems | How does an atom move from an oven into a reloadable computation array? |
| 37:00--44:00 | Fault tolerance and scale | How do physical faults become a logical-error and resource budget? |
| 44:00--45:00 | Overview | What is the single chain connecting all five questions? |

---

## 0:00--3:00 | Opening: a computation is a claim about a physical process

**[Open the overview page. Keep the animated rearrangement cover visible briefly, then scroll to the five learning domains.]**

Good [morning/afternoon]. This website is organized around one question: when can a collection of atoms honestly be called a computer?

The answer is not: when the atoms have many levels, when a gate has high fidelity, or when an array has many sites. A computer is a physical process that begins with a specified input, implements a specified transformation, produces a record, and meets a specified correctness condition. The five sections of this atlas follow that chain.

First, computation must be expressed as state preparation, controlled dynamics, and measurement. Second, we ask why a neutral-atom array is an appropriate physical carrier, and why the isotope $^{171}$Yb is unusually useful within that platform. Third, we turn an abstract gate into a Hamiltonian, a waveform, and a measured quantum channel. Fourth, we examine the apparatus that repeatedly prepares and maintains the atoms. Finally, we ask the only question that matters for a large machine: whether its physical faults can be converted into a decreasing logical error rate at an acceptable resource cost.

I will use the figures as maps rather than as a catalogue. At each stage, we will identify a mathematical object, the corresponding atomic object, and the measurement that tells us whether the correspondence is valid.

---

## 3:00--11:00 | Computation principles: from a logical specification to a measured record

**[Open “Computation principles”, at “How computation becomes a physical process”.]**

Let us begin with the minimal mathematical specification of a quantum computation. We need an input state, a target transformation, and a measurement. I will denote them by

$$
(\rho_L,\;U_L,\;\{E_m\}).
$$

Here $\rho_L$ is a density operator on the logical Hilbert space, $U_L$ is the desired logical unitary, and $\{E_m\}$ is a POVM: a set of positive measurement operators whose sum is the identity. The subscript $L$ means that these are logical objects. At this stage they do not yet say which atom, electronic level, laser, or camera will be used.

The first physical act is an encoding. We choose an isometry $V$ from the logical Hilbert space into a selected atomic subspace, so that

$$
\rho_0=V\rho_LV^\dagger,
\qquad V^\dagger V=I_L.
$$

This is more than notation. It says exactly where the logical state lives. For a nuclear-spin qubit, the two logical basis states may be two Zeeman projections within a chosen electronic manifold. The experiment must then distinguish errors that remain inside this two-dimensional subspace from population that leaks to another electronic or magnetic sublevel, and from the complete absence of the atom.

It is useful to use density matrices from the beginning because the same language covers pure states, classical preparation uncertainty, and entanglement with degrees of freedom that we do not observe. A pure state has $\rho=|\psi\rangle\langle\psi|$; a statistical ensemble has $\rho=\sum_jp_j|\psi_j\rangle\langle\psi_j|$. In both cases the trace is one, and every prediction for a measurement is obtained from the same trace rule. This prevents a common conceptual mistake: treating an observed loss of contrast as if it were always a rotation error. A reduced contrast may arise from a mixture of phase noise, atom motion, leakage, loss, or readout uncertainty. The physical channel and the measurement model are what distinguish those possibilities.

The second act is dynamics. A laboratory does not apply a unitary directly. It applies time-dependent controls: amplitudes, frequencies, phases, polarizations, trap depths, and magnetic fields. Together these produce a Hamiltonian $H[u(t)]$, where $u(t)$ denotes the control vector. The atomic state obeys the Schrodinger equation

$$
i\hbar\frac{\partial}{\partial t}|\psi(t)\rangle=H[u(t)]|\psi(t)\rangle.
$$

For a closed system, the propagator at time $T$ is

$$
U(T)=\mathcal{T}\exp\!\left[-\frac{i}{\hbar}\int_0^T H[u(t)]\,dt\right],
$$

where $\mathcal{T}$ enforces time ordering. This equation is the bridge between a pulse sequence and a quantum gate. The question for an experimentalist is not merely whether a pulse was sent. It is whether the delivered controls generated the intended propagator on the computational subspace.

In practice, the Hamiltonian written in the laboratory frame often oscillates at optical, microwave, or radio frequencies that are much faster than the gate. We move to a rotating frame and discard rapidly oscillating terms under a rotating-wave approximation. The resulting parameters are effective parameters. A quoted detuning can therefore include the programmed frequency offset, Zeeman shifts, Doppler shifts, differential AC Stark shifts, interaction shifts, and residual lock error. This is why a control model must be calibrated at the atom rather than inferred only from the electronics that produced the waveform.

Real atoms are open systems. Spontaneous emission, laser phase noise, motional dephasing, leakage, and loss mean that a unitary is often not sufficient. We therefore describe the physical operation as a quantum channel, for example

$$
\rho \longmapsto \mathcal{N}_{\mathrm{phys}}(\rho).
$$

For Markovian dissipation, the density operator may be modeled by a master equation,

$$
\dot{\rho}=-\frac{i}{\hbar}[H[u(t)],\rho]+\sum_k\!\left(L_k\rho L_k^\dagger-
\frac{1}{2}\{L_k^\dagger L_k,\rho\}\right).
$$

The operators $L_k$ describe particular dissipative channels. They should not be introduced as decoration. Each one represents a concrete way in which the physical state can leave the intended trajectory: scattering, decay, dephasing, leakage, or loss.

The third act is measurement. A measurement outcome $m$ is obtained with probability

$$
p(m)=\operatorname{Tr}(E_m\rho),
\qquad \sum_m E_m=I.
$$

The camera frame, photon count, or state-selective image is not itself the logical result. It must be calibrated into a conditional probability distribution over outcomes. That is why the site emphasizes a confusion matrix and SPAM, short for state-preparation-and-measurement error. A useful readout report separates preparation error, measurement misclassification, leakage, and atom loss. Combining them into one attractive fidelity number makes later decoding ambiguous.

**[Point to the DiVincenzo boundary on the same page.]**

This map also places the DiVincenzo criteria in their correct role. A physical processor needs a scalable state space, initialization, coherence that is relevant to the gate time, a universal gate set, and qubit-specific measurement. These are necessary interfaces. They do not prove fault tolerance, they do not define a threshold, and they do not rank platforms by themselves. They tell us which interfaces a complete processor cannot omit.

The fourth step completes the chain: error correction. A repeated correction cycle takes a physical channel, produces syndrome and flag records, chooses a recovery, and induces a residual logical channel,

$$
\mathcal{N}_L=
\mathcal{R}_{D(s,f)}\circ\mathcal{M}_{s,f}\circ\mathcal{N}_{\mathrm{phys}}.
$$

Here $s$ denotes syndromes, $f$ denotes flags such as a detected erasure, $D$ is the decoder, $\mathcal{M}_{s,f}$ is the conditional measurement map, and $\mathcal{R}_{D(s,f)}$ is the recovery chosen from those records. The essential point is that error correction does not erase physics. It converts a physical channel, together with the information exposed by measurement, into a logical channel that can be compared across code distances and tasks.

That completes the first module. Computation becomes physical when a logical state is encoded in a selected atomic subspace, evolves under a controlled Hamiltonian, is mapped to a calibrated record, and is evaluated after recovery rather than before it.

---

## 11:00--19:00 | Why neutral atoms, and why $^{171}$Yb?

**[Open “Yb platform”, at “Why choose $^{171}$Yb among neutral atoms”.]**

Platform choice should begin with the computational task, not with a list of attractive hardware features. A fault-tolerant machine needs programmable connectivity, parallel control, reliable measurement, and an architecture that can tolerate replacement, calibration, and scheduling overhead. Neutral atoms offer a particular route to these requirements.

An optical tweezer is a tightly focused optical dipole trap. It confines individual atoms at programmable positions. A spatial light modulator, or SLM, can create a stationary array; acousto-optic deflectors, or AODs, can create and move individual traps. Initial loading is stochastic, but imaging reveals which sites are occupied. Mobile tweezers can then move atoms into vacant target sites. This makes the geometry of the array a programmable resource rather than a fixed fabrication pattern.

Geometry alone does not create an entangling gate. The key interaction is a Rydberg interaction. A Rydberg state is an electronically excited state with a large principal quantum number and a very large electric dipole response. If two nearby atoms are both excited toward a Rydberg state, their doubly excited level is shifted by an interaction energy $V_{rr}$. That shift can prevent, or blockade, a second excitation. It turns spatial proximity into a conditional Hamiltonian.

Neutral atoms therefore combine three useful properties: atom-by-atom trapping and imaging, reconfigurable geometry, and a switchable interaction through Rydberg excitation. These properties do not automatically make them superior to superconducting circuits, trapped ions, or photonic systems. Each platform makes a different engineering trade. Superconducting circuits provide fast gates but require cryogenic wiring and interconnect infrastructure. Trapped ions support exceptionally coherent control but face throughput and shuttling constraints at scale. Photonic systems transport quantum information naturally but require efficient deterministic interactions or substantial resource overhead. The relevant comparison is architectural: connectivity, parallelism, control density, fault visibility, and complete-cycle cost.

Now we can ask the more specific question: why $^{171}$Yb?

The isotope $^{171}$Yb is fermionic and has nuclear spin $I=1/2$. Within a suitable electronic manifold, the two nuclear-spin projections provide a simple two-state computational basis. More importantly, ytterbium has several electronically distinct manifolds that can carry different roles. This is the central architectural feature, not merely an atomic-spectroscopy detail.

**[Use the full Yb energy-level figure. Pause on the labeled manifolds.]**

The $^1S_0$ ground manifold can support nuclear-spin storage and, in suitable implementations, ground-manifold qubits. The long-lived $^3P_0$ manifold provides a metastable interface. It is connected to the ground state by the narrow clock transition near 578.4 nm, and it can serve as a qubit manifold for Rydberg-gate protocols. The $^3P_1$ manifold supports narrow-line cooling near 556 nm. The strong $^1S_0\leftrightarrow{}^1P_1$ line near 399 nm supports capture, broad-line cooling, and fluorescence imaging. Rydberg states provide strong conditional interactions. These are separate physical resources with different lifetimes, linewidths, selection rules, and back-action.

This separation permits a useful division of labor. Storage can be assigned to nuclear-spin states. Coherent mapping can transfer selected atoms between ground and metastable manifolds. Rydberg excitation can be used only during the entangling operation. Cooling and imaging can be confined to reservoir or mobile-array regions. State-selective readout can distinguish population in different manifolds and may reveal leakage or loss.

The word “may” is important. An erasure is not simply any detected loss. It is a fault whose location is known to the decoder with sufficiently reliable and sufficiently prompt information. In $^{171}$Yb, manifold-selective detection can convert part of a physical error process into a located flag. The resource advantage depends on the false-flag rate, the miss rate, the latency, the remaining unflagged error channel, the chosen code, and the schedule. The correct claim is conditional: extra atomic structure can expose useful records; it does not eliminate the need to characterize the full circuit channel.

The energy-level diagram is therefore not a list of wavelengths. It is a map of responsibilities. The 399 nm line is primarily a strong cooling and imaging interface. The 556 nm line supports narrow-line cooling and can enter Raman control. The 578 nm clock line coherently links ground and metastable manifolds. The roughly 302 nm route couples a selected metastable computational state to a Rydberg state for entangling gates. The 649 nm and 770 nm pathways can be used for state-selective mapping and readout. Each optical route has a computational function only when placed inside a defined Hamiltonian and an accepted measurement protocol.

---

## 19:00--28:00 | From target unitary to experimentally validated gate

**[Open “Quantum gates and theory”, at “How a quantum gate moves from theory to experiment”.]**

The next figure is a control loop. It begins with a target unitary, passes through a Hamiltonian and a waveform, then returns through measured data to a revised model. This loop is the right way to think about a quantum gate.

Suppose the target is a single-qubit rotation. In a rotating frame, a standard effective Hamiltonian is

$$
\frac{H_{1q}}{\hbar}=
\frac{1}{2}\left[\Omega\cos\phi\,X+
\Omega\sin\phi\,Y+\Delta Z\right].
$$

The Pauli operators $X$, $Y$, and $Z$ act on the chosen qubit subspace. $\Omega$ is the Rabi frequency, $\phi$ is the phase of the drive, and $\Delta$ is the effective detuning. The pulse area sets the rotation angle. The phase chooses an equatorial rotation axis. A nonzero detuning adds a $Z$ component.

This equation explains what a Raman pulse does. Two optical fields can couple two qubit states through a virtually populated excited state. In a ground-manifold $^{171}$Yb qubit, two 556 nm Raman fields can couple the two nuclear-spin states through detuned $^3P_1$ excitation. The single-photon detuning should be large compared with the optical coupling and linewidth so that spontaneous scattering is suppressed while a two-photon coupling remains. The two-photon detuning then controls the qubit resonance. The physical pulse is not characterized only by its duration: the delivered intensities, relative optical phase, frequency difference, polarization, differential AC Stark shift, and motional dependence all enter the effective values of $\Omega$, $\phi$, and $\Delta$.

At the level of an effective three-state $\Lambda$ system, the two optical Rabi frequencies $\Omega_a$ and $\Omega_b$ produce a two-photon coupling that scales as $\Omega_a\Omega_b^*/(2\Delta_\mathrm{1ph})$ when the one-photon detuning $\Delta_\mathrm{1ph}$ is large. The same elimination also produces light shifts. Increasing detuning can suppress excited-state scattering, but it reduces the Raman coupling unless optical power is increased. This trade-off is a concrete example of why gate design is a Hamiltonian-engineering problem rather than a wavelength-selection problem.

Other encodings use other one-qubit primitives. For metastable $^3P_0$ nuclear-spin qubits, a global RF field can drive nuclear-spin rotations, and local phase shifts can synthesize site-resolved operations. The important distinction is between the logical control Hamiltonian and the optical implementation chosen to realize it. The energy-level figure shows possible routes; the gate map tells us what must be verified for any route.

Two-qubit gates require a Hamiltonian that cannot be decomposed into independent one-qubit terms. A simplified Rydberg-blockade model is

$$
\frac{H_{2q}}{\hbar}=
\sum_{j=1}^{2}\frac{\Omega_j(t)}{2}
\left(|r_j\rangle\langle 1_j|+|1_j\rangle\langle r_j|\right)
+V_{rr}|rr\rangle\langle rr|.
$$

The state $|1_j\rangle$ is the selected computational state of atom $j$, $|r_j\rangle$ is its Rydberg state, and $V_{rr}$ is the interaction shift when both atoms occupy Rydberg states. In the blockade regime, $|V_{rr}|$ is large compared with the relevant driving scale. The doubly excited branch is energetically displaced, changing the evolution of the two-atom basis states.

The purpose of a controlled-Z gate is to produce a relative phase that cannot be written as the sum of two independent single-qubit phases. After accounting for single-qubit phases, the conditional phase is

$$
\phi_{11}-\phi_{10}-\phi_{01}+\phi_{00}=\pi
\quad (\mathrm{mod}\;2\pi).
$$

The gate sequence should return population from auxiliary Rydberg states to the computational subspace while leaving this conditional phase. The Rydberg state is therefore an interaction mediator, not normally a storage location. Residual Rydberg population, spontaneous decay, Doppler shifts, laser noise, imperfect blockade, and motional coupling appear as leakage, loss, phase error, or correlated faults in the final channel.

**[Keep the “target unitary → Hamiltonian → control parameters → state evolution → measurement evidence → gate channel” loop on screen.]**

This is why a single benchmark number is incomplete. A gate report should constrain population transfer, phase, leakage, loss, and correlations. Rabi oscillations test coherent coupling. Blockade measurements test the interaction regime. Conditional-phase scans test the entangling phase. Bell-state parity oscillations test a two-qubit coherence observable. Repeated-gate sequences probe error accumulation. No one of these is interchangeable with the others.

The final object is a measured process, often summarized as a channel $\mathcal{E}_{\mathrm{gate}}$. The experiment compares it with the target operation and uses discrepancies to update the Hamiltonian model or the delivered waveform. This is a closed scientific loop: model, control, state evolution, measurement, inference, and revision.

---

## 28:00--37:00 | Experimental systems: from an Yb oven to a reloadable computation array

**[Open “Experimental systems”. Use the full horizontal apparatus figure first.]**

The gate Hamiltonian exists only if the experimental system can repeatedly supply cold, trapped, addressed atoms. This large apparatus figure is deliberately read from left to right, in the order experienced by an atom.

The process begins with an ytterbium oven producing an effusive atomic beam. The beam enters a Zeeman slower, where 399 nm broad-line light and a spatially varying magnetic field keep the atoms near resonance as their longitudinal velocity is reduced. The $^1S_0\leftrightarrow{}^1P_1$ transition has a linewidth of approximately $\Gamma/2\pi\simeq 29$ MHz, making it suitable for high capture force and broad velocity acceptance. A specific detuning, beam intensity, coil profile, and slower length are apparatus parameters, not universal constants.

The slowed atoms are captured first in a 2D magneto-optical trap, or 2D MOT. This stage provides transverse cooling and a directed atomic flux. The atoms are then transferred vertically into a 3D MOT. In the apparatus shown here, narrow-line cooling at 556 nm is used in the 3D stage. The $^1S_0\leftrightarrow{}^3P_1$ intercombination line has a natural linewidth near 182 kHz, much narrower than the 399 nm line. Narrower linewidth means weaker maximum scattering force but finer velocity selectivity, which is why broad-line capture and narrow-line cooling naturally appear as distinct stages.

**[Point to the 2D-to-3D transfer and narrow-line MOT panels.]**

The transfer distance and arrival velocity shown in the figure are apparatus-specific. They establish a useful discipline for reading experimental diagrams: a reported number belongs to a source, a geometry, and a control sequence. It should not be silently promoted into a platform-wide law.

From the MOT, atoms are moved toward the science chamber. The figure uses a cavity-enhanced transport optical dipole trap, or ODT, near 1036 nm. A far-detuned ODT provides confinement through the optical dipole potential. The role of this stage is not to perform a quantum gate. It transports a cold ensemble into a vacuum and optical environment optimized for precision control.

Inside the science chamber, a reservoir and a computation region separate two incompatible requirements. The reservoir must tolerate cooling, imaging, stochastic loading, and atom replacement. The stationary computation array must preserve coherence. This spatial separation is fundamental. Continuous replenishment is useful only if its scattering, background light, magnetic-field changes, and moving traps do not destroy the states already participating in computation.

The next operations occur in a higher numerical-aperture optical system. A 488 nm tweezer system, with a stationary SLM array and mobile AOD-generated tweezers, can load, image, transport, and rearrange individual atoms. Loading is stochastic. The system first learns which sites contain an atom, then moves atoms into a desired geometry. Rearrangement converts random occupation into a known computation register.

**[Scroll to the timing panels. Keep the five-panel horizontal timeline in view.]**

The timing figure turns that spatial apparatus into a repeatable cycle. It is divided into supply, loading, handoff, computation, and readout. The five labels are shown once in the navigation; the panels then display what actually changes in each stage.

In the supply stage, a nearby reservoir is maintained with cooling light while the coherent computation array remains spatially isolated. The principle is not “leave the cooling light on.” The principle is to localize the scattered-light environment and its timing so that it does not illuminate the stationary qubits.

In the loading stage, mobile tweezers capture atoms from the reservoir. A representative schedule in the referenced apparatus allocates a 2 ms loading dwell. Light-assisted collisions are applied for roughly 6 ms to suppress multiple occupancy, followed by about 4 ms of occupancy imaging and 6 ms of cooling to recover a low motional temperature. These durations are reported operating parameters of one apparatus. Their physical purpose is general: prepare known single-atom sites and reduce motional excitation before transport.

In the handoff stage, mobile tweezers move selected atoms into the stationary array. The displayed 0.5 ms transport segment is again apparatus-specific. The transferable architectural idea is that atom replenishment through a mobile array can be scheduled without forcing the stationary compute array to stop, provided the spatial and optical isolation is adequate.

Preparation then maps selected atoms into the intended qubit manifold. In the $^{171}$Yb protocol highlighted here, global 556 nm optical pumping polarizes the ground-manifold nuclear spin. Local Raman-assisted operations can transfer selected sites into the metastable $^3P_0$ manifold. These operations are separated from the Rydberg gate itself. Preparation, coherent control, and readout should each have their own acceptance quantities because they create different error channels.

Readout is also a chain, not a single flash of fluorescence. A state-selective Raman mapping transfers one chosen metastable nuclear-spin state to another manifold. Depumping returns a selected population to an imageable ground state. An image is classified into bright and dark outcomes. Repeating the map-and-image operation for the two logical basis states permits bright/dark, dark/bright, and dark/dark records to be interpreted as logical state zero, logical state one, or loss, subject to a calibrated confusion matrix.

The apparatus, timing diagram, and control map meet at the same atomic state. The control system sends a vector

$$
u_k=\{\nu,P,\phi,\epsilon,t_{\mathrm{trig}}\}_k,
$$

where $\nu$ is frequency, $P$ power, $\phi$ phase, $\epsilon$ polarization, and $t_{\mathrm{trig}}$ a trigger time for control channel $k$. The atom responds through an open-system dynamics. Measurement produces records such as images, spectra, occupancy, and timestamps. A feedback controller, often implemented with FPGA-based timing and logic, then updates calibration or the next cycle.

The engineering criterion is therefore not a visually impressive optical bench. It is whether the apparatus can repeat the intended conditional channel, retain the records needed to diagnose deviations, and preserve a coherent computation region while preparation and maintenance continue elsewhere.

---

## 37:00--44:00 | Fault tolerance, scaling, and cost per trustworthy result

**[Open “Fault tolerance”, at the physical-channel-to-logical-budget map.]**

We now return to the question that connects all previous sections. What makes a quantum computer fault tolerant?

The answer starts with the physical channel, not with a threshold slogan. A realistic neutral-atom cycle can contain in-code Pauli faults, coherent biases, leakage to noncomputational levels, atom loss or occupancy failure, and spatial or temporal correlations. These errors have different consequences because the decoder may know different things about them.

An unflagged Pauli error is an unknown error inside the code space. A coherent over-rotation may accumulate systematically across gates. Leakage can propagate before it is detected. Atom loss can become an erasure if the location and time are reliably identified. A spatiotemporally correlated fault may defeat assumptions that would be valid for independent noise. A fault-tolerance claim must specify which of these channels are present and which records reach the decoder.

The formal condition for correctability is expressed through the Knill--Laflamme relation

$$
P E_a^\dagger E_b P=c_{ab}P.
$$

Here $P$ projects onto the code space, and $E_a$ and $E_b$ are errors in the correctable set. The equation says that, within the code space, the errors do not reveal which logical state was encoded. Their effect can therefore be inferred and reversed without measuring the logical information itself.

For a code of distance $d$, one useful accounting relation is

$$
2t+s<d.
$$

The variable $t$ counts unknown-error locations and $s$ counts known erasure locations. An erasure is less costly to correct because its location is supplied to the decoder. This simple inequality does not replace a full circuit-level analysis. It explains why converting an unknown fault into a sufficiently reliable located erasure can improve a code’s effective tolerance.

**[Point to the funnel: physical channel → syndromes and flags → decode and recover → logical channel.]**

The decoder receives a history of syndromes and flags, written schematically as $(s_{1:T},f_{1:T})$. It selects an estimated error $\widehat e=D(s,f)$ and a recovery. After recovery, the residual action is projected back into the logical subspace:

$$
\mathcal{N}_L=
V^\dagger\mathcal{R}_{\widehat e}\mathcal{N}_{\mathrm{phys}}V.
$$

This expression explains the role of measurement records. A flag is not an optional annotation attached to the data. It changes the decoder’s conditional information and therefore changes the logical channel.

The time index matters. A leakage event detected immediately after a gate, a missing atom detected before the next entangling operation, and a dark image detected only after a long sequence define different circuit channels, even if all three are called “loss” in a summary plot. The decoder needs the site, cycle, classification outcome, and confidence model. The scheduler may also need the record to decide whether to reset a site, transport a replacement atom, or temporarily avoid an interaction edge. Fault-tolerant architecture is therefore a joint design of atomic physics, measurement classification, real-time control, and decoding.

Fault tolerance requires more than one successful correction round. If $p$ is an appropriate physical error parameter and $p_{\mathrm{th}}$ is the threshold for a specified code, decoder, circuit, and noise model, then below threshold one often expects a scaling form such as

$$
p_L(d)\approx A\left(\frac{p}{p_{\mathrm{th}}}\right)^{(d+1)/2}.
$$

The coefficient $A$, the threshold, and even the meaning of the physical rate depend on the model. The equation is useful because it states the test: as the code distance $d$ increases, the logical error $p_L(d)$ must decrease under the same defined conditions. A low component error rate alone is not evidence of this scaling.

Consider the conditional numerical example on the page. If a computation uses $G_L=10^8$ logical operations and the acceptable total failure probability is $\varepsilon_{\mathrm{task}}=10^{-2}$, then a simple union-bound budget requires approximately

$$
G_Lp_L\lesssim\varepsilon_{\mathrm{task}}
\quad\Longrightarrow\quad
p_L\lesssim10^{-10}
$$

per logical operation. This is a task budget, not a reported Yb performance number. The required code distance must be derived from a circuit-level noise model or from measured scaling data. The example makes the engineering consequence visible: a physical error around $10^{-3}$ becomes useful only if the specified code and channel model show genuine below-threshold suppression toward the target logical rate.

The task budget then propagates backward through the machine. It fixes a required code distance. Code distance fixes the number of data and ancilla qubits, spare atoms, and maintenance resources. The logical circuit width and depth set a spacetime volume. The correction cycle, decoder latency, reset, replacement, and availability determine wall-clock time. Only then can we discuss cost per trustworthy result:

$$
C_{\mathrm{result}}=
\frac{C_{\mathrm{amortized}}+C_{\mathrm{opex}}T_{\mathrm{wall}}}
{P_{\mathrm{success}}}.
$$

The denominator is the probability of obtaining a result that meets the same correctness and accuracy criterion used in the comparison. Low cost per atom cannot compensate for a low success probability, a long correction cycle, or an unavailable machine. This is why experimental systems, control throughput, and fault information are inseparable from the eventual cost of computation.

---

## 44:00--45:00 | Closing

**[Return to the overview and the five-domain sequence.]**

We can now read the atlas as one chain rather than five separate topics.

A computation begins with a logical specification. Encoding places that specification in atomic states. A controlled Hamiltonian produces gates. Measurement turns atomic outcomes into records. The $^{171}$Yb level structure lets storage, cooling, mapping, Rydberg interaction, and readout occupy distinguishable physical roles. The apparatus supplies, traps, cools, transports, and replaces atoms so those Hamiltonians can be repeated. Finally, fault tolerance asks whether the resulting physical channel, together with its visible records, produces a smaller logical error as the code grows.

The decisive object is neither an isolated atom nor an isolated gate. It is the full conditional cycle: preparation, coherent evolution, measurement, feedback, maintenance, decoding, and the residual logical channel. That is the standard by which a neutral-atom platform becomes a reliable computing system.

---

## Presenter notes: precision and source boundaries

- Use “approximately” for linewidths, wavelengths, and apparatus timing unless quoting a visible source panel. The 399 nm and 556 nm lines, the 578.4 nm clock transition, and the roughly 302 nm Rydberg excitation route are physical references; delivered detunings, intensities, and pulse parameters depend on the implementation.
- The continuous replacement apparatus and its displayed timing are based on Li et al. (2025), a preprint. Present those timing values as reported for that apparatus, not as general performance limits.
- The metastable-qubit Rydberg interface and mid-circuit erasure conversion refer to Ma et al. (2023). An erasure advantage remains conditional on detection quality, residual faults, decoder, code, and schedule.
- The code-distance scaling law is a model-dependent approximation. Do not present the illustrative $p=10^{-3}$ or $p_L=10^{-10}$ values as a measured platform result.
- The website’s “Extended reading” section contains the relevant source links: DiVincenzo (2000), Ma et al. (2023), Muniz et al. (2025), Li et al. (2025), and the recent logical and fault-tolerance studies.
