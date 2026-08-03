# From computation to a $^{171}$Yb quantum processor

## Scope and use

This is an extended English lecture script for an audience comfortable with undergraduate physics and linear algebra but new to quantum computing. It is designed as a 75--100 minute talk with deliberate pauses for whiteboard derivations and questions. A 45-minute version can omit the marked optional comparisons and the system-engineering module; the mathematical argument remains unchanged.

> How does a declared computation become controlled dynamics of atoms, and what additional physical work is required before those dynamics become a reliable processor?

The argument has three parts:

1. **Computation:** classical logical maps, reversible quantum dynamics, interference, measurement, and the specific conditions under which quantum algorithms obtain an advantage.
2. **Neutral-atom realization:** selected atomic subspaces, light-built Hamiltonians, Rydberg pair interactions, and the conversion of a conditional phase into a two-qubit gate.
3. **$^{171}$Yb processor:** the Yb level manifolds and optical interfaces, followed by cooling, trapping, transport, rearrangement, control, readout, replacement, and error correction as one coupled physical system.

The generic blockade mechanism follows Saffman, Walker, and Molmer (2010). Yb-specific statements are separated from those generic arguments and tied to the Yb references listed at the end.

## Lecture map

| Part | Visual / whiteboard | Question answered |
| --- | --- | --- |
| I. Computation | Foundations map, Whiteboard 1 | What is transformed in classical and quantum computation, and what differs operationally? |
| II. Neutral atoms | Gate map, Whiteboard 2 | How do fields and pair interactions implement one- and two-qubit unitaries? |
| III. $^{171}$Yb system | Yb energy map, apparatus and cycle figures | Which states and optical interfaces realize those operations, and why does the processor need an apparatus and QEC cycle beyond the gate? |

---

## I.1 | Classical computation: declared states, logical maps, and physical realization

**[Open the Foundations page. Do not mention atoms yet.]**

Begin with a strict definition. A computation has four parts: a set of allowed input states, a rule that transforms them, a readout convention, and a correctness condition. Hardware is only one realization of those four objects.

For an $n$-bit classical register, the declared logical state is one string

$$
x\in\{0,1\}^n.
$$

The program specifies a function

$$
f:\{0,1\}^n\rightarrow\{0,1\}^m,
\qquad x\mapsto f(x).
$$

Use a half-adder as the first concrete example. Its two outputs are the sum bit and carry bit,

$$
(a,b)\longmapsto (s,c)=(a\oplus b,\;a\wedge b).
$$

The truth table is the computation: $00\mapsto00$, $01\mapsto10$, $10\mapsto10$, and $11\mapsto01$. A transistor circuit implements it by assigning those logical symbols to stable voltage ranges, propagating voltages through physical devices, and thresholding the final voltages back to symbols.

Write the machine-level condition once:

$$
d\circ\mathcal P\circ e\approx f.
$$

$e$ encodes a logical symbol into a physical state, $\mathcal P$ is the actual physical process, and $d$ decodes the physical output. The approximation sign contains the engineering requirement: noise, drift, and a finite decision threshold are allowed only if the decoded result still meets the specified error bound. The same equation will later describe atomic computation; only the state space and physical process change.

When a classical input is uncertain, the state is a probability distribution $p(x)$ rather than a hidden list of simultaneous values. A noisy classical operation is a stochastic matrix:

$$
p_{\rm out}(y)=\sum_xT(y|x)p_{\rm in}(x),
\qquad T(y|x)\geq0,
\qquad\sum_yT(y|x)=1.
$$

This fixes the first boundary. Classical alternatives combine as non-negative probabilities. The model retains no experimentally accessible relative phase between the alternatives.

---

## I.2 | Quantum computation: amplitudes are controlled before probabilities are read out

**[Use the Foundations map. On the whiteboard, keep the classical probability vector on the left and a ket on the right.]**

Quantum computation keeps the same four-part definition, $d\circ\mathcal P\circ e\approx f$, but a bit is replaced by a two-dimensional complex state space. A pure qubit is

$$
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,
\qquad |\alpha|^2+|\beta|^2=1.
$$

The labels $|0\rangle$ and $|1\rangle$ are still the two declared logical alternatives. The new object is the complex relative phase between their amplitudes. A direct measurement in that basis yields only

$$
P(0)=|\alpha|^2,\qquad P(1)=|\beta|^2.
$$

So a superposition is not a device that reads both answers at once. The difference becomes visible only when a later operation recombines alternatives. If two paths contribute amplitudes $a$ and $b$ to one measured outcome, then

$$
P=|a+b|^2=|a|^2+|b|^2+2\operatorname{Re}(a^*b).
$$

The interference term is absent from the stochastic matrix of the previous section. It can increase a chosen output probability or cancel it exactly.

Use one three-gate circuit to make this operational rather than verbal. Define

$$
H|0\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2},
\qquad
Z|0\rangle=|0\rangle,\quad Z|1\rangle=-|1\rangle.
$$

Then

$$
HZH|0\rangle
=H\frac{|0\rangle-|1\rangle}{\sqrt2}
=|1\rangle.
$$

The middle $Z$ gate changes no $Z$-basis population: immediately after $H$, both outcomes still have probability $1/2$. It changes only a relative sign. The final $H$ converts that sign into the deterministic classical output $1$. This is the smallest useful example of quantum computation: a phase, invisible at one instant, is deliberately converted by a later gate into a measurable bit.

An isolated quantum circuit evolves by a unitary matrix,

$$
|\psi_{\rm out}\rangle=U_L\cdots U_2U_1|\psi_{\rm in}\rangle,
\qquad U_k^\dagger U_k=I.
$$

Unitarity preserves norm and inner products, so closed quantum evolution is reversible. Measurement is a separate physical operation. With a density operator $\rho$ and POVM elements $\{E_m\}$,

$$
p(m)=\operatorname{Tr}(E_m\rho),
\qquad E_m\succeq0,
\qquad\sum_mE_m=I.
$$

For an atom array, $m$ must be calibrated into declared records such as logical $0$, logical $1$, loss, or leakage. A fluorescence image becomes a computation result only after this decoding step.

---

## I.3 | What the extra quantum structure changes, and what it does not

**[Whiteboard 1A: put the half-adder on the left; keep $HZH=X$ on the right.]**

### Reversible gates replace an isolated irreversible AND

The classical AND map erases information: $(0,0)$, $(0,1)$, and $(1,0)$ all produce $0$. A unitary cannot do this on a closed quantum register because it is one-to-one. The corresponding coherent construction is a reversible embedding,

$$
|a,b,c\rangle\longmapsto |a,b,c\oplus(a\wedge b)\rangle.
$$

This Toffoli gate computes AND into an ancilla when $c=0$, while retaining $a$ and $b$. Classical irreversibility enters only through measurement, reset, or deliberately discarded degrees of freedom. Quantum circuits therefore compile classical logic into reversible gates before they exploit superposition.

### A random mixture cannot substitute for a coherent superposition

The classical distribution $p(0)=p(1)=1/2$ and

$$
|+\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2}
$$

give identical direct $Z$-basis statistics. Yet applying $H$ yields $H|+\rangle=|0\rangle$, while the incoherent mixture remains mixed. The difference is exactly the off-diagonal density-matrix element $\rho_{01}$. In an atom, a Ramsey experiment measures this resource: a first $\pi/2$ rotation creates $\rho_{01}$, free evolution changes its phase, and a phase-referenced second rotation converts it into a population signal.

### A two-qubit phase that cannot be decomposed is an entangling resource

One-qubit rotations can create and read interference, but they cannot make the output of one qubit depend on the state of another. A controlled-Z acts as

$$
CZ\,|ab\rangle=(-1)^{ab}|ab\rangle.
$$

Only $|11\rangle$ receives the phase $\pi$. Applied to $|+\rangle|+\rangle$, this produces a Bell-equivalent entangled state. The phase is not certified by a population truth table alone: it must be converted to an interference observable, for example with analysis rotations and parity oscillations. This is the particular operation that a Rydberg interaction will supply.

### Where computational advantage enters

An $n$-qubit state has $2^n$ complex amplitudes, but a measurement returns only a small classical record. The exponential state-vector dimension is therefore not an automatic speedup. A useful quantum algorithm has to use a circuit of feasible size to convert a structured global property into a small observable.

- **Grover search:** coherent amplitude amplification changes an unstructured black-box query cost from $O(N)$ to $O(\sqrt N)$.
- **Period finding:** a quantum Fourier transform turns phase periodicity into a measurement distribution from which the period is inferred; Shor's factoring algorithm is the canonical application.
- **Quantum simulation:** a local quantum Hamiltonian can be encoded and evolved by local quantum operations, while the experiment reads selected correlators, spectra, or samples rather than a complete wavefunction.

The physical consequence is strict. An atomic processor must preserve coherence long enough to arrange interference, implement an entangling interaction that produces a calibrated conditional phase, and measure the chosen observable without confusing it with loss or leakage.

---

## I.4 | Atomic quantum computation: a logical Hilbert space inside an atom

**[Whiteboard 1: draw a nucleus with electrons only once, then replace it immediately by energy levels $|0\rangle$, $|1\rangle$, and $|r\rangle$.]**

An atom is a bound quantum system of a nucleus and electrons. In isolation it has a Hamiltonian $H_0$ and discrete internal eigenstates,

$$
H_0|a\rangle=E_a|a\rangle.
$$

Atomic quantum computing does not use the whole atom as an uncontrolled object. It selects a small subspace of those internal eigenstates and declares it to be the logical Hilbert space. For one Yb atom, the encoding map is an isometry

$$
V:\mathcal H_L\rightarrow\mathcal H_{\rm atom},
\qquad
V|0\rangle_L=|0\rangle_{\rm atom},\quad
V|1\rangle_L=|1\rangle_{\rm atom}.
$$

The atom is then not an analogy for a bit. Its internal quantum state *is* the physical carrier of the logical vector. The laboratory changes that state by applying electromagnetic fields. In the dipole approximation,

$$
H_{\rm atom}[u(t)]=H_0-\mathbf d\!\cdot\!\mathbf E(t)-\boldsymbol\mu\!\cdot\!\mathbf B(t)+H_{\rm pair}.
$$

$\mathbf d$ is the electric dipole operator, $\mathbf E(t)$ is the applied optical field, $\boldsymbol\mu$ is the magnetic moment, $\mathbf B(t)$ is the magnetic field, and $H_{\rm pair}$ is absent for an isolated atom but contains atom--atom interactions when two atoms are used. The control vector $u(t)$ means the fields' amplitudes, frequencies, phases, polarizations, and timing.

The ideal physical realization of a logical gate is therefore

$$
V U_L\rho_LU_L^\dagger V^\dagger
\;\approx\;
U_{\rm atom}[u(t)]\,(V\rho_LV^\dagger)\,U_{\rm atom}^\dagger[u(t)],
$$

followed by a calibrated atomic measurement. This is the essential mapping: logical states are encoded in selected atomic states; logical gates are designed as controlled atomic time evolution; logical output is decoded from an atomic measurement record.

Now reduce the selected subspace to two levels, $|0\rangle$ and $|1\rangle$, and ask what a phase-coherent field does.

Suppose $|0\rangle$ and $|1\rangle$ are two selected nuclear-spin states. In a rotating frame, a resonant control field gives the effective Hamiltonian

$$
H_1(t)=\frac{\hbar\Omega(t)}{2}
\left[\cos\phi(t)X+\sin\phi(t)Y\right]
-\frac{\hbar\Delta(t)}{2}Z.
$$

Here $X$, $Y$, and $Z$ are Pauli operators in the chosen qubit basis. $\Omega$ is the Rabi angular frequency, $\phi$ is the phase of the applied control relative to a reference oscillator, and $\Delta$ is the detuning in angular-frequency units. This is already the bridge from a laboratory waveform to a logical gate.

On resonance, $\Delta=0$, with constant phase $\phi$, a pulse with area $\theta=\int\Omega(t)dt$ produces

$$
R_\phi(\theta)=
\exp\left[-\frac{i\theta}{2}
(\cos\phi\,X+\sin\phi\,Y)\right].
$$

For example, set $\phi=0$:

$$
R_x(\pi)|0\rangle=-i|1\rangle,
\qquad
R_x\!\left(\frac{\pi}{2}\right)|0\rangle=
\frac{|0\rangle-i|1\rangle}{\sqrt2}.
$$

The factor $-i$ by itself is not observable. The relative phase between $|0\rangle$ and $|1\rangle$ is observable after another rotation. Shifting the drive phase by $\pi/2$ changes the rotation axis from $X$ to $Y$. Thus a calibrated RF or Raman phase becomes a physical relative phase in the atom.

This is one-qubit computation. It is local: every unitary produced by this Hamiltonian acts on one atom only. A universal processor also needs an operation that cannot be decomposed into one-qubit rotations.

---

## II.1 | Rydberg pair interactions: an internal-state-controlled switch

**[Open “How Rydberg blockade produces CZ.” Keep $|11\rangle$ selected first: point to the control and target level ladders, the dashed target arrow, and the interaction-shifted $|rr\rangle$ level labeled $B$. Then select $|01\rangle$ to contrast the resonant $2\pi_t$ loop.]**

Neutral atoms have an architectural advantage: the states used to store a qubit can be weakly interacting, while a selected auxiliary Rydberg state can interact strongly with another excited atom. The interaction is therefore switched by internal-state control.

Saffman, Walker, and Molmer illustrate this contrast in their 2010 review with Rb $100s$ atoms. At the crossover distance in their figure, the Rydberg interaction is about twelve orders of magnitude larger than the corresponding ground-state interaction:

$$
\mathcal C_{\rm switch}
=\frac{|U_{\rm Rydberg}|}{|U_{\rm ground}|}
\sim10^{12}.
$$

Be precise about this statement. $10^{12}$ is an **interaction on/off contrast** in that Rb review example. It does not mean that an interaction scales as the twelfth power of principal quantum number $n$, and it is not a number that can be copied into a Yb gate specification. The Yb interaction depends on the selected Rydberg level, magnetic field, polarization, pair orientation, separation, and nearby pair states.

Why can the Rydberg interaction become so strong? A pair state $|rr\rangle$ can be coupled by the electric dipole-dipole interaction to a nearby pair state $|ab\rangle$. In the simplest two-channel basis, write

$$
H_{\rm pair}=
\begin{pmatrix}
0 & C_3(\vartheta)/R^3\\
C_3(\vartheta)/R^3 & \delta
\end{pmatrix}.
$$

$R$ is the atom separation, $C_3(\vartheta)$ is the angle-dependent dipole-dipole coefficient, and $\delta$ is the Förster defect: the energy difference between the bare pair channels. This one matrix explains the two distance laws in the review.

If the dipole coupling is larger than the defect,

$$
\left|\frac{C_3}{R^3}\right|\gg|\delta|,
$$

the pair states are strongly mixed and the energy shift is resonant, approximately proportional to $R^{-3}$. If the coupling is smaller than the defect,

$$
\left|\frac{C_3}{R^3}\right|\ll|\delta|,
$$

the other pair channel is only virtually populated. Second-order perturbation theory gives

$$
\Delta E_{rr}\simeq-\frac{|C_3(\vartheta)|^2}{\delta R^6}
\equiv-\frac{C_6(\vartheta)}{R^6}.
$$

Away from a Förster resonance, a common Rydberg scaling estimate is $C_6\propto n^{11}$. That is the $n$-dependence often quoted for van der Waals interactions. It is distinct from the $10^{12}$ switching contrast. In real gate design, neither a scalar $C_6$ nor a distance alone is enough: angular channels can weaken or reshape the interaction, so pair spectroscopy is part of calibrating the gate Hamiltonian.

---

## II.2 | From pair Hamiltonian to controlled-Z gate

**[Return to $|11\rangle$. Whiteboard 2: draw two atoms, then the levels $|0\rangle$, $|1\rangle$, and $|r\rangle$ for each atom.]**

Let $|1\rangle$ be the computational state that we choose to couple to a Rydberg level $|r\rangle$. For two atoms, control $c$ and target $t$, a minimal rotating-frame Hamiltonian is

$$
\frac{H}{\hbar}=
\sum_{j=c,t}
\left[
\frac{\Omega_j(t)}{2}
\left(e^{i\phi_j(t)}|r_j\rangle\langle1_j|+\mathrm{h.c.}\right)
-\Delta_j(t)|r_j\rangle\langle r_j|
\right]
+B|rr\rangle\langle rr|.
$$

$B=\Delta E_{rr}/\hbar$ is the double-Rydberg interaction shift in angular-frequency units. When $|B|$ is much larger than the drive scale and effective linewidth,

$$
|B|\gg |\Omega_t|,\ \Gamma_{\rm eff},
$$

the target transition from $|r_c1_t\rangle$ to $|r_cr_t\rangle$ is off resonance. This is Rydberg blockade. It is not a mysterious force that “turns off” an atom; it is ordinary detuned quantum dynamics caused by the interaction-shifted energy of $|rr\rangle$.

The standard three-pulse blockade sequence reviewed by Saffman is

$$
\pi_c:\ |1_c\rangle\leftrightarrow|r_c\rangle,
\qquad
2\pi_t:\ |1_t\rangle\leftrightarrow|r_t\rangle,
\qquad
\pi_c:\ |r_c\rangle\leftrightarrow|1_c\rangle.
$$

Now follow the four computational basis states.

1. $|00\rangle$ is dark to all three pulses.
2. $|01\rangle$ has control $0$, so the target executes its resonant $2\pi$ excursion and acquires a pulse phase.
3. $|10\rangle$ takes the control atom up and back through $|r_c\rangle$ and acquires a control-pulse phase.
4. $|11\rangle$ begins by moving the control to $|r_c\rangle$. The target pulse would couple $|r_c1_t\rangle$ to $|r_cr_t\rangle$, but the latter is detuned by $B$, so the target does not execute the same resonant loop as in $|01\rangle$.

With a standard pulse-phase convention, the sequence gives

$$
U_{\rm bare}=\operatorname{diag}(1,-1,-1,-1).
$$

This is already entangling, but it is not written in the conventional controlled-Z form. The one-qubit phase corrections are known:

$$
(Z_c\otimes Z_t)U_{\rm bare}
=\operatorname{diag}(1,1,1,-1)
=U_{\rm CZ}.
$$

The key invariant is the conditional phase

$$
\phi_{11}-\phi_{10}-\phi_{01}+\phi_{00}=\pi
\quad(\mathrm{mod}\ 2\pi).
$$

No combination of independent one-qubit phases can produce this quantity. This is the exact point at which two atomic trajectories become a two-qubit logic gate. A CNOT is obtained by changing basis on the target:

$$
\operatorname{CNOT}=(I\otimes H)\,CZ\,(I\otimes H).
$$

---

## III.1 | Why $^{171}$Yb can supply the required interfaces

**[Open the full $^{171}$Yb energy-level map. Do not read every arrow. Trace only the required computation path.]**

The generic Rydberg mechanism does not yet choose an atom or a qubit. The Yb energy-level diagram answers two separate questions: why use Yb rather than only an alkali hyperfine qubit, and why use the isotope $^{171}$Yb rather than another Yb isotope.

The design requirement is concise: information should be quiet between gates, but a selected component must couple strongly during a two-qubit gate. Yb is valuable because these roles can occupy different electronic manifolds. This is an architectural advantage, not a claim that Rb or Cs cannot be coherent: alkali platforms can use magnetically insensitive clock transitions, but their storage, cooling, readout and gate tools mostly share a single-valence-electron structure.

Yb is alkaline-earth-like with two valence electrons. Both $6s^2,{}^1S_0$ and $6s6p,{}^3P_0$ have

$$
J=0.
$$

An ideal $J=0$ state has no first-order **electronic** Zeeman moment. What remains is nuclear-spin sensitivity together with practical bias-field, differential-light-shift and technical-noise errors. Thus $J=0$ does not mean “noise-free”; it means that the electron magnetic moment is not the dominant storage degree of freedom.

$^{171}$Yb has nuclear spin

$$
I=\frac12.
$$

In a $J=0$ manifold, $F=I=1/2$, so a bias field resolves exactly two projections, $m_F=\pm 1/2$. That is the isotope-level reason for $^{171}$Yb: it provides the smallest nuclear-spin doublet. Even-A Yb isotopes have $I=0$, hence only $m_F=0$ in a $J=0$ manifold and no nuclear-spin qubit doublet. $^{173}$Yb has $I=5/2$ and six projections, useful for qudit research but more demanding for optical pumping, spectral selection and spectator-state control.

Read the diagram as an interface allocation, not as a list of transitions that must be illuminated at once. A processor assigns capture, narrow-line cooling, storage, coherent transfer, Rydberg interaction and state-selective readout to specific manifolds. The same atom can support several encodings, but one calculation must still declare its logical subspace, driven auxiliary state, dark spectator state and measurement map.

Start with $6s^2\,{}^1S_0$. The broad 399 nm $^1S_0\leftrightarrow{}^1P_1$ transition is useful for capture and fluorescence. It is a preparation and measurement interface, not the two-qubit gate itself.

The narrow 556 nm $^1S_0\leftrightarrow{}^3P_1$ transition has a different role. Its linewidth supports narrow-line MOT cooling, molasses, and resolved fluorescence protocols. With two far-detuned optical tones it can also be an intermediate state for a ground-manifold Raman gate. These uses are distinguished by detuning, polarization, intensity, spatial mode, and timing; the wavelength alone does not define the operation.

The 556 nm $^1S_0\leftrightarrow{}^3P_1$ line is narrow enough to support narrow-line cooling. It can also mediate a ground-manifold Raman rotation. In a three-level Raman scheme, two optical fields couple $|0\rangle$ and $|1\rangle$ through a detuned intermediate state $|e\rangle$:

$$
|0\rangle\xleftrightarrow[\Omega_a]{\omega_a}|e\rangle
\xleftrightarrow[\Omega_b]{\omega_b}|1\rangle.
$$

For large one-photon detuning $|\Delta_{\rm 1ph}|\gg|\Omega_a|,|\Omega_b|,\Gamma_e$, the intermediate state is only virtually occupied and

$$
\Omega_{\rm eff}\simeq
\frac{\Omega_a\Omega_b^*}{2\Delta_{\rm 1ph}}.
$$

The complex phase of $\Omega_{\rm eff}$ is precisely the phase $\phi$ in the one-qubit Hamiltonian. Thus Raman control is not simply “a laser transition”: it realizes the calibrated $X$ and $Y$ rotations written earlier. The same approximation also predicts differential light shifts and residual scattering, which is why detuning and intensity must be calibrated together.

The clock transition near 578.4 nm connects $^1S_0$ and the metastable $6s6p\,{}^3P_0$ manifold. It can transfer population between those manifolds and serve as a coherent state-preparation interface. It is not a Raman pair by itself: a single resonant clock field addresses the corresponding optical transition. In a magnetic field, the nuclear-spin projections are spectrally resolved; the field defines the quantization axis and makes the intended polarization selection rule meaningful.

The atlas also shows Raman interfaces through higher metastable manifolds, including routes involving $^3P_0$, $^3P_2$, and $6s7s\,{}^3S_1$. Such routes are useful options for particular encodings and selection rules. They should be introduced as alternatives, not combined into a single universal pulse sequence. The Hamiltonian, detunings, scattering budget, and readout map change with the encoding.

For the Rydberg two-qubit route displayed in the atlas, use nuclear-spin states inside the metastable $6s6p\,{}^3P_0$ manifold as the computational basis. The metastable state is not the Rydberg state; it is the long-lived computational manifold from which selected population is promoted to $|r\rangle$.

Then choose one metastable qubit component as the driven state and couple it with the approximately 302 nm field to a selected $6sns\,{}^3S_1$ Rydberg level:

$$
|1\rangle\subset{}^3P_0
\xleftrightarrow[\Omega(t)]{\ \sim302\ \mathrm{nm}\ }
|r\rangle\subset6sns\,{}^3S_1.
$$

The other computational state $|0\rangle$ must remain dark, or receive only a calibrated correctable phase. In this Yb implementation the 302 nm field does not “perform CZ” by itself. It supplies the $|1\rangle\leftrightarrow|r\rangle$ term in the two-atom Hamiltonian. The Rydberg pair interaction supplies $B|rr\rangle\langle rr|$. The pulse sequence and local phase corrections then turn those two ingredients into $CZ$.

This separation also prevents a common misreading of the energy diagram. It lists multiple valid single-qubit control interfaces: RF or microwave control within a chosen manifold, 556 nm Raman control in the ground manifold, and other Raman routes in metastable manifolds. They are alternatives for different encodings and experiments. They are not all used in one gate sequence. The Rydberg CZ pathway in this talk is specifically: metastable nuclear-spin qubit, state-selective coupling to $|r\rangle$, blockade, return, and measurement.

Finally, return to 399 nm fluorescence for a readout record, with the state mapping required by the chosen protocol. A successful computation requires more than atom survival: the readout model must distinguish the intended bright/dark outcomes from empty sites and population that has leaked outside the computational manifold.

---

## III.2 | From an Yb source to a registered computation array

**[Open the apparatus path. Follow the atoms from left to right once; do not read every number in the figure.]**

The energy-level map specifies possible internal-state operations. It does not supply atoms at low entropy, hold them at known positions, or ensure that the same control field reaches each selected atom. Those requirements are performed by the apparatus. The stages below are not a preamble to computing; each one changes a term in the Hamiltonian or a contribution to the final error channel.

### 1. Produce a usable atomic flux

An Yb oven produces an effusive thermal beam. Its velocity distribution is far too broad for a shallow optical trap. A 399 nm Zeeman slower uses the broad $^1S_0\leftrightarrow{}^1P_1$ transition and a spatially varying magnetic field to keep a chosen velocity class near resonance while it scatters many photons. The 2D MOT then provides transverse cooling and collimation. Both stages increase capturable flux; neither prepares a qubit.

The physical variable being reduced is momentum spread. Photon scattering changes the mean velocity through radiation pressure, while the combination of red detuning and magnetic-field gradient supplies a restoring force near the MOT center. Broad-line cooling is chosen here because a large linewidth gives a large scattering rate and capture velocity, at the cost of a relatively high Doppler temperature.

### 2. Transfer into narrow-line cooling without losing flux

In the apparatus reported by Li *et al.* for continuous Yb replacement, atoms travel from the 2D MOT to a 3D narrow-line MOT over a 35 cm vertical separation. Gravity alone would produce an arrival speed exceeding the capture range of a conventional single-frequency 556 nm MOT. Their solution is a rapidly swept 556 nm detuning, which presents different velocity classes with a resonant component during capture. This is a useful example of a general engineering point: a laser frequency program is part of the capture Hamiltonian, not an optional optical detail.

The 556 nm $^1S_0\leftrightarrow{}^3P_1$ line has natural linewidth $\Gamma_{556}/2\pi\approx182.4\,\mathrm{kHz}$, much narrower than the 399 nm line. Narrow-line MOT and molasses therefore lower the momentum width more strongly, but they accept fewer fast atoms. The broad-to-narrow cooling chain resolves that conflict by assigning capture and final temperature reduction to different transitions.

### 3. Transport atoms without losing the optical reference frame

Atoms must arrive at the science chamber with adequate phase-space density and with a trap that does not destroy the narrow-line cooling condition. In the cited apparatus, a cavity-enhanced 1036 nm optical dipole trap transports atoms from the MOT region to the science chamber. The wavelength is selected near a magic condition for the relevant intercombination transition, so that the trap shifts the two levels similarly and does not strongly alter the cooling resonance across the transport path.

An optical dipole trap does not cool by itself. It supplies a conservative potential $U(\mathbf r)$; any residual motion changes the sampled intensity, Doppler shift, and optical phase. The transport problem is therefore to preserve capture while avoiding parametric heating, scattering, differential light shifts, and phase noise. A transport efficiency alone is not a gate-quality metric.

### 4. Build a reservoir and load addressable tweezers

Inside the science chamber, 556 nm molasses creates a cold reservoir. A mobile two-dimensional tweezer array generated by crossed AODs can capture atoms from that reservoir and carry them to an imaging or handoff region; a stationary array generated by an SLM can hold the computational geometry. In the Li *et al.* example, the tweezer wavelength is near 488 nm and is chosen to be magic for a specified 556 nm transition. The relevant design criterion is not the color of the tweezer light; it is the differential shift, trap depth, motional spectrum, and optical access it produces for the chosen preparation and imaging sequence.

Initial loading is stochastic. Light-assisted collisions and imaging can impose parity projection or otherwise classify occupancy, but a nonempty image does not yet create a defect-free register. Rearrangement uses movable traps to map occupied reservoir sites into the target graph. It converts a random spatial occupation pattern into the geometry assumed by the gate schedule and code. The rearrangement planner must preserve trap depth and motional state while avoiding collisions and illumination of an array that may already be computing.

### 5. Cool, prepare, compute, and read out in distinct optical contexts

After loading or transport, cooling reduces motional excitation. The replacement experiment reports a 6 ms cooling step reaching an approximately $10\,\mu\mathrm K$ final temperature in its reported mobile-tweezer sequence; this is an apparatus-specific result, not a universal Yb operating temperature. Its computational meaning is clear: smaller velocity spread reduces Doppler detuning, and smaller spatial extent reduces sampling of intensity and phase gradients.

State preparation then maps atoms into the declared computational manifold. Gate control applies RF, microwave, Raman, clock, or Rydberg fields according to the selected encoding; only the fields required by that encoding belong in a single gate sequence. Readout maps the final internal state to photons and a classifier record. The record must retain at least the distinction required by the protocol: logical outcome, empty site, and population outside the computational manifold cannot automatically be merged into one binary label.

The whole chain can therefore be summarized as

$$
\text{flux}
\rightarrow
\text{capture}
\rightarrow
\text{low momentum spread}
\rightarrow
\text{known site occupancy}
\rightarrow
\text{prepared internal state}
\rightarrow
\text{controlled gate Hamiltonian}
\rightarrow
\text{calibrated classical record}.
$$

Each arrow removes a different ambiguity. The final gate cannot repair an atom that is missing, too hot, in the wrong trap, prepared in the wrong manifold, or read out with an uncalibrated classifier.

---

## III.3 | Error correction and replacement: the processor must expose errors as records

**[Open the experimental cycle figure. Keep the physical sequence visible rather than a decoder dashboard.]**

Quantum error correction does not mean repeating the same gate until it succeeds. A code embeds logical states in a larger Hilbert space and repeatedly measures commuting error syndromes without measuring the encoded logical amplitudes. For a code projector $P$ and a correctable set of error operators $\{E_a\}$, the Knill--Laflamme condition is

$$
P E_a^\dagger E_b P=c_{ab}P.
$$

The scalar matrix $c_{ab}$ means that, within the code space, the error process does not reveal which logical state was stored. Ancilla measurements can then identify an error syndrome and select a recovery without learning the logical data. This is the mathematical reason a correction cycle requires additional atoms, gates, measurements, reset, timing, and a classical decoder.

At the device level, a physical mechanism must be followed all the way to the decoder:

$$
\text{motion, decay, loss, crosstalk, or laser noise}
\rightarrow
\text{gate-level fault or leakage}
\rightarrow
\text{syndrome and flag record}
\rightarrow
\text{decoder decision}
\rightarrow
\text{logical error probability}.
$$

The same physical event can be qualitatively different depending on what becomes known. A Pauli error hidden inside the computational subspace must be inferred from a syndrome. Atom loss or a successfully detected leakage event can provide a location flag, becoming an erasure-type input to the decoder. That flag is valuable only if it arrives before the fault propagates through later gates and if its false-positive and false-negative rates are included in the circuit model.

For a subthreshold code family, a common phenomenological fit is

$$
p_L(d)\approx A\left(\frac{p}{p_{\rm th}}\right)^{(d+1)/2},
$$

where $p$ is a suitably defined physical circuit-error rate, $p_{\rm th}$ is the threshold for a particular code, noise model, decoder, and cycle, $d$ is code distance, and $A$ is a fitted prefactor. This expression is not a component-fidelity conversion. It becomes meaningful only after correlated gates, measurement errors, leakage, loss, and timing are represented in the same cycle channel.

Yb metastable-state protocols are relevant here because some loss or leakage processes can be converted into detectable erasure information. The value is not that Yb removes errors automatically. The value is that the physical level structure can produce an additional record for the decoder, provided preparation, detection, reset, and replacement preserve the required timing and fidelity.

---

## III.4 | What limits the gate, and the final answer

**[Return to “Gate trade-off”, then leave the Yb energy diagram visible for the final sentence.]**

The blockade condition is not binary. If $B$ is finite, the off-resonant $|rr\rangle$ branch has residual population of order

$$
P_{rr}=O\!\left[\left(\frac{\Omega}{B}\right)^2\right].
$$

Reducing $\Omega$ suppresses this blockade leakage, but the gate then spends longer in the Rydberg state. If $\tau$ is the Rydberg lifetime, spontaneous-emission exposure has the opposite trend,

$$
E_{\rm blockade}\sim\left(\frac{\Omega}{B}\right)^2,
\qquad
E_{\rm spontaneous}\sim\frac{1}{\Omega\tau}.
$$

The idealized square-pulse model discussed by Saffman balances these contributions and gives an optimized scaling

$$
E_{\min}\propto(B\tau)^{-2/3}.
$$

This is not a Yb device prediction. It is the physical design lesson: a usable gate needs both a large interaction shift and a sufficiently long-lived auxiliary state, while control noise, motion, extra levels, and imperfect measurement impose additional errors beyond this simple model.

We can now answer the opening question in one chain.

$$
\begin{aligned}
&\text{$^{171}$Yb nuclear-spin states} &&\longrightarrow&& \text{logical }|0\rangle,|1\rangle,\\
&\text{RF or Raman phase-coherent drives} &&\longrightarrow&& \text{one-qubit rotations},\\
&{}^3P_0\leftrightarrow |r\rangle\text{ coupling plus }|rr\rangle\text{ shift} &&\longrightarrow&& \text{conditional phase and }CZ,\\
&\text{state-selective fluorescence record} &&\longrightarrow&& \text{classical output.}
\end{aligned}
$$

Yb does not compute because it has many optical lines. It computes when we choose a protected two-state encoding, calibrate the Hamiltonian that acts on it, use a Rydberg interaction to make one amplitude path conditional on another, return population to the computational subspace, and measure the result under a stated readout model.

Thank you.

---

## Presenter notes and source boundaries

- The lecture is modular. For a short seminar, retain I.1, I.2, I.4, II.1, II.2, III.1, and III.4. For a systems or fault-tolerance audience, retain III.2 and III.3; do not compress them into a list of hardware names.
- The reversible-Toffoli comparison, the Ramsey comparison of a mixture and a superposition, and the Bell-state comparison are conceptual derivations. They do not assert that the Yb apparatus uses a Toffoli gate or prepares the Bell state in the exact sequences drawn on the atlas.
- The 399 nm and 556 nm linewidths, 35 cm transfer geometry, 1036 nm transport ODT, 488 nm tweezer implementation, and approximately $10\,\mu\mathrm K$ post-imaging cooling value describe the apparatus reported by Li *et al.*, *Fast, continuous and coherent atom replacement in a neutral atom qubit array*. They are examples of an implementation, not platform-independent requirements.
- The logical-error expression $p_L(d)$ is a subthreshold scaling model. Threshold, prefactor, and exponent depend on the chosen code, decoder, circuit schedule, and noise model. It must not be used to infer Yb logical performance from a single physical gate fidelity.

- The $10^{12}$ interaction contrast is the Rb $100s$ review comparison in Saffman, Walker, and Molmer, *Quantum information with Rydberg atoms*, Rev. Mod. Phys. 82, 2313 (2010), Fig. 1. Call it a contrast, not an Yb parameter and not an $n^{12}$ law.
- The $R^{-3}$ resonant and $R^{-6}$ van der Waals discussion follows the same review, especially its pair-potential discussion around Fig. 9. $C_6\propto n^{11}$ is a useful asymptotic statement away from Förster resonance; it is not a universal scalar coefficient for every geometry.
- The three-pulse blockade sequence and $\operatorname{diag}(1,-1,-1,-1)$ phase convention are reviewed in Saffman et al. Local $Z$ phases convert it to conventional $CZ$.
- The $E_{\rm blockade}\sim(\Omega/B)^2$ and $E_{\rm spontaneous}\sim1/(\Omega\tau)$ balance is the idealized square-pulse blockade intuition associated with the review's intrinsic-error analysis. It omits laser phase noise, Doppler shifts, multichannel interactions, spectator atoms, pulse shaping, and measurement errors.
- The Yb-specific level assignment follows the atlas references, especially Jenkins et al., *Ytterbium Nuclear-Spin Qubits in an Optical Tweezer Array* (2022), and Ma et al., *High-fidelity gates and mid-circuit erasure conversion in an atomic qubit* (2023). Do not quote the Rb review's numerical interaction scales as values for those Yb experiments.
- When speaking, use “conditional phase” only for $\phi_{11}-\phi_{10}-\phi_{01}+\phi_{00}$, not for an arbitrary one-qubit Stark phase.
