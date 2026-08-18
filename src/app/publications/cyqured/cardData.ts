// Full transcription of all 84 unique CyQured card faces (34 action, 30
// chance, 20 scenario), read directly from the print-ready card images in
// public/media/publications/cyqured/cards/. pairIds on action cards resolve
// the card names each card's body text references as countering / being
// countered by it, matched by title (see TODO comments for two references
// — "Brute-Force" — that do not match any card title in the deck).

export type CardDeck = "action" | "chance" | "scenario";
export type CardCategory = "attack" | "defense" | "chance" | "scenario";

export type CardFace = {
  id: string; // e.g. "action-02", matches the source filename stem
  deck: CardDeck;
  category: CardCategory;
  title: string;
  strideType?: string; // attack cards only
  targets?: string[]; // attack cards only: devices it can be played against
  body: string;
  pairIds?: string[]; // action cards only: ids of cards it references as countering/countered-by
  src: string; // e.g. "/media/publications/cyqured/cards/action/action-02.png"
};

export const cardFaces: CardFace[] = [
  // ===================== ACTION CARDS (34) =====================
  // ----- Attack cards (action-02 .. action-18) -----
  {
    id: "action-02",
    deck: "action",
    category: "attack",
    title: "Phishing",
    strideType: "Spoofing",
    targets: ["Smartphone", "Tablet", "Laptop", "Desktop"],
    body: `An attacker sends deceptive emails or messages to trick the victim into revealing sensitive information, such as login credentials or financial details.

Target the defender's **Smartphone**, **Tablet**, **Laptop**, or **Desktop**. This can be defended using **Multi Factor Authentication** and **Email Filtering** & **Anti-Phishing** defense cards.`,
    pairIds: ["action-19", "action-21"],
    src: "/media/publications/cyqured/cards/action/action-02.png",
  },
  {
    id: "action-03",
    deck: "action",
    category: "attack",
    title: "Caller ID Spoofing",
    strideType: "Spoofing",
    targets: ["Smartphone"],
    body: `Your opponent received a call from a seemingly trusted source, but it was an attacker using a spoofed caller ID. Believing it to be legitimate, they shared sensitive information, compromising their security and got scammed.

This attack can be played on **Smartphones** and can be mitigated by using **Call Authentication Protocol**.`,
    pairIds: ["action-20"],
    src: "/media/publications/cyqured/cards/action/action-03.png",
  },
  {
    id: "action-04",
    deck: "action",
    category: "attack",
    title: "Trojan Horse",
    strideType: "Tampering, Elevation of Privilege",
    targets: ["Laptop", "Desktop", "Smartphone", "Tablet", "Home Server"],
    body: `Your opponent has downloaded a seemingly harmless program that secretly carries malicious code. Once executed, the Trojan grants the attacker unauthorized access or control over the system.

This attack can be played on **laptops**, **desktops**, **smartphones**, **tablets**, and **home servers** when the victim downloads or installs unverified software and can be defended using the **Anti-virus** & **Anti-malware**.`,
    pairIds: ["action-22"],
    src: "/media/publications/cyqured/cards/action/action-04.png",
  },
  {
    id: "action-05",
    deck: "action",
    category: "attack",
    title: "Shoulder Surfing",
    strideType: "Information Disclosure",
    targets: ["Laptop", "Desktop", "Smartphone", "Tablet", "Smart Door-lock"],
    body: `An attacker spies on your opponent while they enter sensitive information, such as passwords or PINs, by looking over their shoulder or recording their keystrokes. This attack is especially effective in public or unsecured environments.

This attack can be played on **Laptops**, **Desktops**, **Smartphones**, **Tablets**, **Smart Doorlocks** when the victim enters credentials or sensitive data in an exposed setting. It can be defended using **Multi-Factor Authentication** and **Strong Password Policy & Manager** cards.`,
    pairIds: ["action-19", "action-28"],
    src: "/media/publications/cyqured/cards/action/action-05.png",
  },
  {
    id: "action-06",
    deck: "action",
    category: "attack",
    title: "Ransomware",
    strideType: "Denial of Service",
    targets: ["Laptop", "Desktop", "Smartphone", "Tablet", "Home Server"],
    body: `Your opponent's system has been infected with ransomware, a type of malware that encrypts files and locks them until a ransom is paid. The victim is unable to access critical data, disrupting operations and causing potential data loss.

This attack can be played on **laptops**, **desktops**, **smartphones**, **tablets**, and **home servers**. This can be defended using the **Data Backup & Recovery** and **Anti-Virus** & **Anti-Malware**.`,
    pairIds: ["action-23", "action-22"],
    src: "/media/publications/cyqured/cards/action/action-06.png",
  },
  {
    id: "action-07",
    deck: "action",
    category: "attack",
    title: "Zero-Day Exploit",
    strideType: "Elevation of Privilege",
    targets: ["All devices"],
    body: `An attacker exploits an unknown vulnerability in your opponent's system before a patch or fix is available. This allows the attacker to gain unauthorized access, execute malicious code, or disrupt system operations without detection.

This attack can be played on **all devices** and can be defended using **Secure Firmware & Software Updates** and **Intrusion Detection & Prevention Systems (IPS/IDS)**.`,
    pairIds: ["action-24", "action-33"],
    src: "/media/publications/cyqured/cards/action/action-07.png",
  },
  {
    id: "action-08",
    deck: "action",
    category: "attack",
    title: "Firmware Attack",
    strideType: "Tampering, Elevation of Privilege",
    targets: ["All devices"],
    body: `An attacker injects malicious code into the firmware of a device to compromise its core functionality. Since firmware operates at a low level, this attack can persist even after reboots and reinstalls and gives the attacker long-term control over the device.

This attack can be played on **all devices** when the device runs outdated or vulnerable firmware. This can be defended using the **Secure Firmware & Software Updates** and **Intrusion Detection & Prevention (IDS/IPS)** cards.`,
    pairIds: ["action-24", "action-33"],
    src: "/media/publications/cyqured/cards/action/action-08.png",
  },
  {
    id: "action-09",
    deck: "action",
    category: "attack",
    title: "Activity Log Manipulation",
    strideType: "Repudiation",
    targets: ["Laptop", "Desktop", "Home Server", "Smart Door-lock", "IP Camera"],
    body: `An attacker accesses sensitive files and then deletes activity logs to hide the unauthorized access and makes it difficult to prove the incident occurred and track down who has done this.

This attack can be played on any device or system that maintains activity logs, such as **Laptops**, **Desktops**, **Home Servers**, **Smart Doorlocks**, and **IP Cameras**. It can be mitigated using **Immutable Logging** defense cards.`,
    pairIds: ["action-34"],
    src: "/media/publications/cyqured/cards/action/action-09.png",
  },
  {
    id: "action-10",
    deck: "action",
    category: "attack",
    title: "Session Hijacking",
    strideType: "Tampering, Spoofing",
    targets: ["Laptop", "Desktop", "Smartphone", "Tablet"],
    body: `An attacker intercepts or steals an active session token from your opponent which allows them to take control of the victim's authenticated session without needing login credentials. This can lead to unauthorized access to sensitive accounts and data.

This attack can be played on **laptops**, **desktops**, **smartphones**, and **tablets**. It can be defended using **Secure Session Management & Browser Security**.`,
    pairIds: ["action-26"],
    src: "/media/publications/cyqured/cards/action/action-10.png",
  },
  {
    id: "action-11",
    deck: "action",
    category: "attack",
    title: "Password Cracking",
    strideType: "Elevation of Privilege",
    targets: ["All devices"],
    body: `An attacker repeatedly tries different password combinations to break into an account or system. Weak or commonly used passwords make this attack more effective and easier.

This attack can be played on **all devices** that are secured with passwords. It can be defended using **Strong Password Policy & Manager**, **Account Lockout & Rate Limiting**, and **Multi-Factor Authentication**.`,
    pairIds: ["action-28", "action-27", "action-19"],
    src: "/media/publications/cyqured/cards/action/action-11.png",
  },
  {
    id: "action-12",
    deck: "action",
    category: "attack",
    title: "Credential Stuffing",
    strideType: "Spoofing",
    targets: ["All devices"],
    body: `An attacker uses previously leaked or stolen username-password pairs to gain unauthorized access to your opponent's accounts. Since many users reuse passwords across multiple sites, this automated attack can compromise multiple accounts.

This attack can be played on **all devices** when the victim uses weak or reused credentials. It can be defended using **Multi-Factor Authentication** and **Strong Password Policy & Manager** cards.`,
    pairIds: ["action-19", "action-28"],
    src: "/media/publications/cyqured/cards/action/action-12.png",
  },
  {
    id: "action-13",
    deck: "action",
    category: "attack",
    title: "Wireless Sniffing",
    strideType: "Information Disclosure",
    targets: ["All devices"],
    body: `An attacker intercepts unencrypted wireless communications to capture sensitive data, such as login credentials, financial details, or private messages. This allows them to eavesdrop on network traffic and steal valuable information.

This attack can be played on **all devices** when they transmit unencrypted data over Wi-Fi or Bluetooth. This can be defended using the **Bluetooth & Wireless Security (WPA3)** and **VPN & Network Encryption** cards.`,
    // NOTE: card body says "VPN & Network Encryption" but the matching defense
    // card (action-29) is actually titled "VPN & Secure Encryption" — treated
    // as the same card (only VPN-related defense in the deck; minor wording diff).
    pairIds: ["action-32", "action-29"],
    src: "/media/publications/cyqured/cards/action/action-13.png",
  },
  {
    id: "action-14",
    deck: "action",
    category: "attack",
    title: "DDoS Attack with Botnet",
    strideType: "Denial of Service",
    targets: ["All devices"],
    body: `An attacker has compromised multiple devices, forming a botnet to launch a Distributed Denial-of-Service (DDoS) attack. The attacker floods the target system with overwhelming traffic, making it slow or completely unavailable.

This attack can be played on **all devices** when they are exposed to high-volume malicious traffic. This can be defended using **Intrusion Detection & Prevention (IDS/IPS)** and **Firewall & Network Segmentation** cards.`,
    pairIds: ["action-33", "action-25"],
    src: "/media/publications/cyqured/cards/action/action-14.png",
  },
  {
    id: "action-15",
    deck: "action",
    category: "attack",
    title: "Router Hijacking",
    strideType: "Tampering",
    targets: ["Wireless Router"],
    body: `An attacker gains control of your opponent's router by exploiting weak credentials, outdated firmware, or misconfigurations. Once hijacked, the attacker can redirect traffic, intercept sensitive data, or deploy further attacks on connected devices.

This attack can be played on **routers** when they are exposed to unauthorized access. This can be defended using **Strong Password Policy & Manager**, **Use Secure DNS & Disable Rogue DNS Changes**, and **Firewall & Network Segmentation**.`,
    pairIds: ["action-28", "action-31", "action-25"],
    src: "/media/publications/cyqured/cards/action/action-15.png",
  },
  {
    id: "action-16",
    deck: "action",
    category: "attack",
    title: "ARP Spoofing",
    strideType: "Tampering, Information Disclosure",
    targets: ["All devices"],
    body: `An attacker links their MAC address with the IP address of a target device and sends forged ARP messages on the local network. This man-in-the-middle attack allows the attacker to intercept, monitor, or alter communications between devices.

This attack can be played on **all devices** that rely on ARP for network communication. It can be defended using **VPN & Network Encryption** and **Firewall & Network Segmentation** cards.`,
    pairIds: ["action-29", "action-25"],
    src: "/media/publications/cyqured/cards/action/action-16.png",
  },
  {
    id: "action-17",
    deck: "action",
    category: "attack",
    title: "Network Jammer",
    strideType: "Denial of Service",
    targets: ["All devices"],
    body: `An attacker disrupts wireless communications by overwhelming the network with interference, making it difficult or impossible for devices to connect. This prevents legitimate users from accessing Wi-Fi, Bluetooth, or other wireless networks.

This attack can be played on **all the devices when they rely on wireless connectivity**. This can be defended using **Wired Connections for Critical Devices.**`,
    pairIds: ["action-30"],
    src: "/media/publications/cyqured/cards/action/action-17.png",
  },
  {
    id: "action-18",
    deck: "action",
    category: "attack",
    title: "Ultimate Attack",
    body: `You can play this card to act like any of the attacks that are listed for this game, and you can play wherever you want, choosing the perfect attack for the asset that you chose.`,
    src: "/media/publications/cyqured/cards/action/action-18.png",
  },
  // ----- Defense cards (action-19 .. action-35) -----
  {
    id: "action-19",
    deck: "action",
    category: "defense",
    title: "Multi Factor Authentication",
    body: `Enabling this adds an extra layer of security. Even if attackers steal your credentials, they still need another verification factor to gain access.

While this card is in play, **Phishing**, **Shoulder Surfing**, and **Credential Stuffing** attacks cannot bypass authentication, and keeps your account secure.`,
    pairIds: ["action-02", "action-05", "action-12"],
    src: "/media/publications/cyqured/cards/action/action-19.png",
  },
  {
    id: "action-20",
    deck: "action",
    category: "defense",
    title: "Call Authentication Protocol",
    body: `A framework that verifies the authenticity of incoming calls by digitally signing caller ID information. This prevents attackers from spoofing numbers and impersonating trusted entities like banks or government agencies.

While this card is in play, **Caller ID Spoofing** attacks fail to deceive you and protects you from social engineering scams.`,
    pairIds: ["action-03"],
    src: "/media/publications/cyqured/cards/action/action-20.png",
  },
  {
    id: "action-21",
    deck: "action",
    category: "defense",
    title: "Email Filtering & Anti-Phishing",
    body: `Uses advanced algorithms to scan incoming emails for phishing links and malicious attachments. Suspicious emails are blocked before they reach your inbox, reducing the risk of scams.

This card can defend any type of **Phishing** attacks and keeps your communication secured by preventing the theft of critical information.`,
    pairIds: ["action-02"],
    src: "/media/publications/cyqured/cards/action/action-21.png",
  },
  {
    id: "action-22",
    deck: "action",
    category: "defense",
    title: "Anti-Virus & Anti-Malware",
    body: `Scans your device for malicious software, such as trojans, ransomware, and spyware. It scans, detects and removes these threats in real-time, protecting your system from unauthorized access and data theft.

While this card is in play, **Trojan Horses** and **Ransomware Attacks** targeting your assets are blocked before they can execute and save your system from a **Malware Attack**.`,
    pairIds: ["action-04", "action-06"],
    src: "/media/publications/cyqured/cards/action/action-22.png",
  },
  {
    id: "action-23",
    deck: "action",
    category: "defense",
    title: "Data Backup & Recovery",
    body: `You maintain regular backups of critical data and implement a recovery plan to restore lost or corrupted files. Backups are stored securely and ensures that even if an attack encrypts or deletes your data, you can recover it without any disruption.

If you have this defense on your computer system, **Ransomware Attacks** cannot permanently delete or lock your data, and it can save your data from destruction.`,
    pairIds: ["action-06"],
    src: "/media/publications/cyqured/cards/action/action-23.png",
  },
  {
    id: "action-24",
    deck: "action",
    category: "defense",
    title: "Secure Firmware & Software Updates",
    body: `You regularly update and patch your firmware and software to fix security vulnerabilities and prevent attackers from exploiting outdated systems. Automated updates ensure critical patches are applied promptly, reducing exposure to threats.

While this card is in play, **Firmware Attacks** and **Zero-Day Exploits** have no effect on your systems.`,
    pairIds: ["action-08", "action-07"],
    src: "/media/publications/cyqured/cards/action/action-24.png",
  },
  {
    id: "action-25",
    deck: "action",
    category: "defense",
    title: "Firewall & Network Segmentation",
    body: `You deploy firewalls and segment your network to control and restrict traffic flow. Firewalls block unauthorized access, while segmentation limits an attacker's ability to move between systems, protecting critical assets.

While this card is in play, **DDoS Attack with Botnet** and **Router Hijacking** cannot target your network. Additionally, Network Segmentation prevents lateral movement, reducing the impact of malware and unauthorized access attempts.`,
    pairIds: ["action-14", "action-15"],
    src: "/media/publications/cyqured/cards/action/action-25.png",
  },
  {
    id: "action-26",
    deck: "action",
    category: "defense",
    title: "Secure Session Management and Browser security",
    body: `Ensures web sessions are properly authenticated, encrypted, and protected from hijacking. Implements security measures like HTTPS, secure cookies, and session timeouts to prevent unauthorized access.

This card mitigates **Session Hijacking** attack to keep your online accounts and sensitive data secure from interception.`,
    pairIds: ["action-10"],
    src: "/media/publications/cyqured/cards/action/action-26.png",
  },
  {
    id: "action-27",
    deck: "action",
    category: "defense",
    title: "Account Lockout & Rate Limiting",
    body: `Prevents attackers from repeatedly guessing passwords by locking accounts after multiple failed attempts and limiting login requests. This reduces the risk of brute-force and credential stuffing attacks.

While this card is in play, **Brute-Force** and **Credential Stuffing** attacks fail to gain unauthorized access to your account.`,
    // TODO: unresolved reference "Brute-Force" — no action card in the deck
    // is titled "Brute-Force". Closest concept is action-11 "Password
    // Cracking" (repeated password guessing) but the title text does not
    // match, so it is intentionally left unlinked rather than guessed.
    pairIds: ["action-12"],
    src: "/media/publications/cyqured/cards/action/action-27.png",
  },
  {
    id: "action-28",
    deck: "action",
    category: "defense",
    title: "Strong Password Policy and Manager",
    body: `Encourages the use of complex, unique passwords and securely stores them in an encrypted vault, preventing attackers from guessing or reusing stolen credentials.

While this card is in play, **Brute-Force** and **Credential Stuffing** attacks fail, keeping your accounts safe from unauthorized access.`,
    // TODO: unresolved reference "Brute-Force" — same as action-27, no
    // matching card title in the deck; not guessed/linked.
    pairIds: ["action-12"],
    src: "/media/publications/cyqured/cards/action/action-28.png",
  },
  {
    id: "action-29",
    deck: "action",
    category: "defense",
    title: "VPN & Secure Encryption",
    body: `You enable encryption on your network using VPN, TLS, or HTTPS to protect data from being intercepted. Encryption scrambles the information, making it unreadable to attackers trying to spy on your traffic.

Select a **Network Card** that you have in play and attach this card to it. That network is now encrypted. While encrypted, it cannot be targeted by **Wireless Sniffing** or **ARP Spoofing** attacks. Remove from play any Wireless Sniffing or ARP Spoofing cards affecting the encrypted network.`,
    pairIds: ["action-13", "action-16"],
    src: "/media/publications/cyqured/cards/action/action-29.png",
  },
  {
    id: "action-30",
    deck: "action",
    category: "defense",
    title: "Wired Connections for Critical Devices",
    body: `Uses wired Ethernet connections instead of Wi-Fi for critical devices, such as routers and servers. This reduces vulnerability to wireless attacks, such as jamming and sniffing, which are more common in wireless networks.

This card prevents your critical devices from any **Wireless Sniffing** and **Network Jammer** attacks to ensure reliable and secure connectivity.`,
    pairIds: ["action-13", "action-17"],
    src: "/media/publications/cyqured/cards/action/action-30.png",
  },
  {
    id: "action-31",
    deck: "action",
    category: "defense",
    title: "Secure DNS & Disable Rogue DNS Changes",
    body: `Ensures that your devices use trusted DNS servers and prevents unauthorized changes to DNS settings. This blocks attackers from redirecting your traffic to malicious sites or hijacking your internet connections.

While this card is in play, **Router Hijacking** attacks fail to manipulate your DNS settings, and keeps your network traffic secure.`,
    pairIds: ["action-15"],
    src: "/media/publications/cyqured/cards/action/action-31.png",
  },
  {
    id: "action-32",
    deck: "action",
    category: "defense",
    title: "Bluetooth & Wireless Security",
    body: `Implements the latest wireless security standards like WPA3 encryption, to protect your Wi-Fi network from eavesdropping and unauthorized access. It also ensures that Bluetooth devices use secure pairing methods.

This defense mitigates **Wireless Sniffing** attacks and prevents attackers from intercepting your wireless communications.`,
    pairIds: ["action-13"],
    src: "/media/publications/cyqured/cards/action/action-32.png",
  },
  {
    id: "action-33",
    deck: "action",
    category: "defense",
    title: "Intrusion Detection & Prevention System",
    body: `Monitors network traffic in real-time to detect and block suspicious activities, preventing attackers from exploiting vulnerabilities. Helps stop unauthorized access and mitigate network-based threats.

While this card is in play, this protects your network from infiltration and disruption by mitigating **Zero-Day Exploit**, **DDoS with Botnet**, **Router Hijacking**, and **ARP Spoofing** attacks.`,
    pairIds: ["action-07", "action-14", "action-15", "action-16"],
    src: "/media/publications/cyqured/cards/action/action-33.png",
  },
  {
    id: "action-34",
    deck: "action",
    category: "defense",
    title: "Immutable Logging",
    body: `Implement tamper-evident or immutable logging systems to ensure that activity logs cannot be deleted or altered without detection. This helps prove the occurrence of attacks even if an attacker tries to cover their tracks.

While this card is in play, **Activity Log Manipulation** fails. This makes it harder for attackers to hide their unauthorized actions.`,
    pairIds: ["action-09"],
    src: "/media/publications/cyqured/cards/action/action-34.png",
  },
  {
    id: "action-35",
    deck: "action",
    category: "defense",
    title: "Ultimate Defense",
    body: `With this card in hand, you can choose any defense listed for this game, depending on the asset being attacked and the attack type.`,
    src: "/media/publications/cyqured/cards/action/action-35.png",
  },

  // ===================== CHANCE CARDS (30) =====================
  {
    id: "chance-02",
    deck: "chance",
    category: "chance",
    title: "Backup Power Generator",
    body: `You recently acquired a backup generator to keep your systems running during an electrical failure. The moment a power outage occurs, the generator automatically restores power, preventing disruptions.

Play this card during a power outage to immediately regain your turn and keep all your devices operational.`,
    src: "/media/publications/cyqured/cards/chance/chance-02.png",
  },
  {
    id: "chance-03",
    deck: "chance",
    category: "chance",
    title: "Opponent Power Outage",
    body: `Your chosen opponent experiences a sudden loss of electrical power, rendering all equipped devices inactive. With no operational systems, no actions can be taken.

Select an opponent and apply this card. That opponent **loses the next turn**, and **all equipped devices remain inactive** until the turn is regained. Any player landing on the cell does nothing, as no attacks can be made.`,
    src: "/media/publications/cyqured/cards/chance/chance-03.png",
  },
  {
    id: "chance-04",
    deck: "chance",
    category: "chance",
    title: "Attack Pass Card",
    body: `This special card allows you to bypass an opponent's cell without engaging in any action. When you land on an opponent's territory where you don't choose to attack, you can use this card to **avoid attacks or penalties**.

Keep this card and play it whenever you choose. When landing on an opponent's cell, you may activate this card to pass through without taking any action.`,
    src: "/media/publications/cyqured/cards/chance/chance-04.png",
  },
  {
    id: "chance-05",
    deck: "chance",
    category: "chance",
    title: "Defense Pass Card",
    body: `This special card allows you to skip defending against an attack. The attacker proceeds without taking any action, and the asset remains protected.

Keep this card and play it when an attacker lands, **before any attack cards are played**. This card lets you pass the defense phase without using any defense cards.`,
    src: "/media/publications/cyqured/cards/chance/chance-05.png",
  },
  {
    id: "chance-06",
    deck: "chance",
    category: "chance",
    title: "Firewall Upgrade",
    body: `With a new firewall upgrade, your network security just got stronger! A reinforced firewall protects your system from cyber threats, making it harder for attackers to breach.

**Block one incoming attacker** on your cell next turn, and earn points from the blocked attacker.`,
    src: "/media/publications/cyqured/cards/chance/chance-06.png",
  },
  {
    id: "chance-07",
    deck: "chance",
    category: "chance",
    title: "Patching Pays Off",
    body: `You installed important security patches before hackers could exploit a weakness. This prevented potential attacks and kept your system safe from harm. Regular updates help block threats before they happen.

Gain **4 points** and **move forward 2 spaces** for staying ahead with strong security.`,
    src: "/media/publications/cyqured/cards/chance/chance-07.png",
  },
  {
    id: "chance-08",
    deck: "chance",
    category: "chance",
    title: "Zero Trust, Zero Loss",
    body: `Your zero-trust security model prevented an unauthorized access attempt! By enforcing strict verification and limiting privileges, you ensured no breach could occur. This proactive strategy strengthens your system and keeps attackers at bay.

Gain **3 points** and **take 2 action cards** from the main deck for successfully implementing a zero-trust approach and securing your assets.`,
    src: "/media/publications/cyqured/cards/chance/chance-08.png",
  },
  {
    id: "chance-09",
    deck: "chance",
    category: "chance",
    title: "Digital Signatures Stopped Forgery",
    body: `A malicious user tried to alter a transaction and deny responsibility, but your use of digital signatures and cryptographic verification ensured authenticity. Their forgery attempt failed, and your records remained intact.

As a reward for your security foresight and avoiding repudiation, gain **6 points**.`,
    src: "/media/publications/cyqured/cards/chance/chance-09.png",
  },
  {
    id: "chance-10",
    deck: "chance",
    category: "chance",
    title: "Avoided Unsecured Wi-Fi Trap",
    body: `You recognized the dangers of connecting to an unsecured public Wi-Fi network and took the right precautions. By using a VPN, disabling auto-connect, and verifying network security, you protected your data from potential cyber threats.

As a reward for your caution, **gain 3 points** and **go 2 spaces backwards**.`,
    src: "/media/publications/cyqured/cards/chance/chance-10.png",
  },
  {
    id: "chance-11",
    deck: "chance",
    category: "chance",
    title: "Secure Logging Prevented Fraud",
    body: `An attacker attempted to deny their actions on your system, but your tamper-proof logging system kept a clear, verifiable record. With cryptographic logging and centralized log management, you ensured accountability and prevented manipulation.

As a reward for securing your system, **gain 3 points** and **draw 2 cards** from the action card deck.`,
    src: "/media/publications/cyqured/cards/chance/chance-11.png",
  },
  {
    id: "chance-12",
    deck: "chance",
    category: "chance",
    title: "System Upgrade Bonus",
    body: `Your system has completed a full upgrade cycle. This enhances security and performance. Now you are better prepared for future cyber threats with improved defenses and optimized operations.

Move directly to the **smartphone** cell and **collect 3 cards** from the deck as a reward.`,
    src: "/media/publications/cyqured/cards/chance/chance-12.png",
  },
  {
    id: "chance-13",
    deck: "chance",
    category: "chance",
    title: "Mobile Device Management (MDM)",
    body: `Your Mobile Device Management (MDM) system ensures that lost, stolen, or misused devices can be remotely locked or wiped, preventing unauthorized access and securing sensitive data. By maintaining strict control over your mobile assets, you've strengthened your cybersecurity posture.

**Gain 5 points** and **draw 1 action card** for successfully implementing MDM security.`,
    src: "/media/publications/cyqured/cards/chance/chance-13.png",
  },
  {
    id: "chance-14",
    deck: "chance",
    category: "chance",
    title: "Honeypot Deployed",
    body: `You strategically set up a honeypot—an intentionally vulnerable system designed to attract cyber attackers. This decoy appears to hold valuable data and the intruders get tricked into interacting with it, while security systems silently monitor their actions. By analyzing attack patterns, you strengthen your defenses and prevent future breaches.

**Gain 6 points** and **get 2 cards** from the action deck.`,
    src: "/media/publications/cyqured/cards/chance/chance-14.png",
  },
  {
    id: "chance-15",
    deck: "chance",
    category: "chance",
    title: "Geofencing Security Boost!",
    body: `You implemented geofencing to restrict access based on location. This ensures that only authorized users can interact with your systems. This added layer of security prevented unauthorized access attempts, keeping your assets safe.

**Gain 3 points** and **draw 1 extra action card** for strengthening your security perimeter!`,
    src: "/media/publications/cyqured/cards/chance/chance-15.png",
  },
  {
    id: "chance-16",
    deck: "chance",
    category: "chance",
    title: "Emergency Power Loss",
    body: `Your home system encountered a critical power failure, shutting down all connected devices. You lose your next turn, and all acquired devices remain inactive until your turn is regained.

While inactive, no player is required to attack when landing on your cell and can pass through without taking any action. **If you have a Backup Generator card, you may play it to restore power and regain your turn immediately**.`,
    src: "/media/publications/cyqured/cards/chance/chance-16.png",
  },
  {
    id: "chance-17",
    deck: "chance",
    category: "chance",
    title: "Social Engineering Exploited",
    body: `An attacker tricked you into revealing sensitive login credentials through a deceptive phone call. With this information, they gained unauthorized access to your system and your security got compromised.

**Lose 7 points** and **discard 1 card** from your hand. To prevent this in the future, always verify requests for sensitive information, enable multi-factor authentication, and stay cautious of unsolicited messages or calls.`,
    src: "/media/publications/cyqured/cards/chance/chance-17.png",
  },
  {
    id: "chance-18",
    deck: "chance",
    category: "chance",
    title: "Password Reuse Blunder",
    body: `Reusing old passwords cost you! One of your compromised passwords was found in a data breach, putting your accounts at risk. Weak security habits make it easier for attackers to steal sensitive information.

**Lose 2 points** and **put 2 action cards** of your choice into the main action deck. Reset all your passwords to strengthen your security.`,
    src: "/media/publications/cyqured/cards/chance/chance-18.png",
  },
  {
    id: "chance-19",
    deck: "chance",
    category: "chance",
    title: "Keylogger Detected",
    body: `A hidden keylogger has been silently recording your keystrokes, stealing your passwords, messages, and sensitive data. Without proper protection, your private information is now exposed to an attacker.

**Lose 4 points** immediately. To prevent this in the future, use virtual keyboards to avoid physical keyloggers and install anti-malware to detect keylogger software.`,
    src: "/media/publications/cyqured/cards/chance/chance-19.png",
  },
  {
    id: "chance-20",
    deck: "chance",
    category: "chance",
    title: "Drive-By Download Attack",
    body: `You unknowingly visited a compromised website where you allowed malware to silently download onto your system. Without proper security measures like software updates, web filtering, and browser restrictions, the infection spread, compromising your data.

**Lose 3 points** and **discard 2 action cardd** of your choice from your hand.`,
    // NOTE: card has a printed typo "cardd" (should read "cards"); transcribed verbatim.
    src: "/media/publications/cyqured/cards/chance/chance-20.png",
  },
  {
    id: "chance-21",
    deck: "chance",
    category: "chance",
    title: "Supply Chain Compromise!",
    body: `A vendor's software update contained a hidden backdoor which eventually allowed the attackers to infiltrate your system. Without proper security checks, your network is now exposed to threats.

**Lose 4 points** and **go to the Gaming Console** cell. Prevent this by verifying software sources, using code-signing certificates, and conducting security audits.`,
    src: "/media/publications/cyqured/cards/chance/chance-21.png",
  },
  {
    id: "chance-22",
    deck: "chance",
    category: "chance",
    title: "Cryptojacked",
    body: `Your system's processing power has been hijacked to secretly mine cryptocurrency for an attacker. Without your knowledge, your device is overheating, slowing down, and consuming excessive energy. Poor security practices, outdated software, or visiting compromised websites made this possible.

You **lose 7 points** and **discard 1 action card.** You could prevent this by using anti-malware, blocking malicious scripts, and keeping software updated.`,
    src: "/media/publications/cyqured/cards/chance/chance-22.png",
  },
  {
    id: "chance-23",
    deck: "chance",
    category: "chance",
    title: "Insider Threat",
    body: `A guest, family member, or curious child accidentally or intentionally compromised your security. Whether by tampering with devices, leaking sensitive data, or installing unknown software, the damage is done.

**Lose 5 points** and **move back 2 spaces**. Prevent this by enforcing strict access controls, using guest networks, and monitoring device activity.`,
    src: "/media/publications/cyqured/cards/chance/chance-23.png",
  },
  {
    id: "chance-24",
    deck: "chance",
    category: "chance",
    title: "Application Rootkit Detected",
    body: `A stealthy rootkit has embedded itself deep within your system, evading detection and control. Standard antimalware solutions are ineffective, requiring advanced threat hunting and system integrity checks to remove it.

**Lose 8 points** immediately. No standalone defense cards can counter this attack.`,
    src: "/media/publications/cyqured/cards/chance/chance-24.png",
  },
  {
    id: "chance-25",
    deck: "chance",
    category: "chance",
    title: "Dumpster Diving Data Breach",
    body: `You had improperly disposed of sensitive information—either by discarding old storage devices without securely wiping them or tossing documents without shredding them. Attackers recovered your deleted data, leading to a serious breach.

**Lose 4 points** immediately. This could have been prevented by physically destroying storage devices, using data-wiping software, or shredding confidential documents before disposal.`,
    src: "/media/publications/cyqured/cards/chance/chance-25.png",
  },
  {
    id: "chance-26",
    deck: "chance",
    category: "chance",
    title: "Spyware Intrusion",
    body: `A hidden spyware has infected your system, secretly tracking your activities and stealing sensitive data. Your private information is being exposed, compromising your security.

**Lose 5 points** immediately. Use anti-spyware tools and regular security checks to prevent future intrusions.`,
    src: "/media/publications/cyqured/cards/chance/chance-26.png",
  },
  {
    id: "chance-27",
    deck: "chance",
    category: "chance",
    title: "Zeus Trojan Infection",
    body: `Your system has been compromised by the Zeus Trojan, a powerful malware that steals passwords, banking credentials, and other sensitive data. Without strong protective measures, your private information is at risk.

This could be prevented with **multi-factor authentication** or **anti-malware** defense cards. If you can't defend against it, you **lose 3 points** immediately.`,
    src: "/media/publications/cyqured/cards/chance/chance-27.png",
  },
  {
    id: "chance-28",
    deck: "chance",
    category: "chance",
    title: "Poor Encryption Key",
    body: `An attacker easily crack your weak wireless encryption key, granting them access to your network traffic. Now exposure to sensitive data has put your security at risk.

**Lose 5 points** and **discard 1 card** from your hand. To prevent this in the future, use strong encryption protocols like WPA3 and regularly update your network credentials.`,
    // NOTE: card has a printed grammar typo "easily crack" (should read "cracks"); transcribed verbatim.
    src: "/media/publications/cyqured/cards/chance/chance-28.png",
  },
  {
    id: "chance-29",
    deck: "chance",
    category: "chance",
    title: "Unscheduled Maintenance",
    body: `A critical system issue forced you to perform emergency maintenance and disrupted your operations. Important tasks were delayed, and resources had to be reallocated to address the issue.

**Go to Smart Speaker** and **skip your next turn**. To avoid such disruptions in the future, implement regular system checks and scheduled maintenance plans.`,
    src: "/media/publications/cyqured/cards/chance/chance-29.png",
  },
  {
    id: "chance-30",
    deck: "chance",
    category: "chance",
    title: "Evil Twin Wi-Fi Attack",
    body: `You connected to what looked like a legitimate Wi-Fi network, but it was actually a rogue hotspot mimicking a public network. Attackers intercepted your data and injected malware.

You can use the **VPN & Network Encryption** defense card to mitigate this vulnerability; otherwise, you **lose 5 points** and **go 3 spaces backwards**.`,
    src: "/media/publications/cyqured/cards/chance/chance-30.png",
  },
  {
    id: "chance-31",
    deck: "chance",
    category: "chance",
    title: "Trade Card",
    body: `This special card allows you to trade cards with any chosen opponent, giving you the chance to shift strategies and gain new advantages.

Play this card to exchange **2 cards** with an opponent you chose. Choose 2 cards from your hand and then pick 2 random cards from the opponent's hand, seeing only the back of the cards.`,
    src: "/media/publications/cyqured/cards/chance/chance-31.png",
  },

  // ===================== SCENARIO CARDS (20) =====================
  // All 20 scenario cards use the generic title "Scenario" as printed —
  // none carry a distinct incident-specific title.
  {
    id: "scenario-02",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You receive an email pretending to be from your ISP, urging you to click a link to "update your payment details." The email looks official, with the ISP's logo and branding, but the link leads to a suspicious website asking for your credit card information.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-02.png",
  },
  {
    id: "scenario-03",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You receive a call from someone claiming to be from your bank. They say there's suspicious activity on your account and ask for your account details to "verify your identity." The caller ID shows your bank's official number, which makes the call seem legitimate.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-03.png",
  },
  {
    id: "scenario-04",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You type your bank's official URL into your browser, but instead of the real website, you're redirected to a fake site that looks identical. The fake site asks you to log in with your credentials.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-04.png",
  },
  {
    id: "scenario-05",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You receive an alert that someone tried logging into your email from an unfamiliar location. You realize you've reused the same password on multiple sites, and one of those sites was recently breached.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-05.png",
  },
  {
    id: "scenario-06",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your internet slows down, and you notice unfamiliar devices connected to your router. When you check the router settings, you see changes you didn't make, like a new admin password or DNS settings.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-06.png",
  },
  {
    id: "scenario-07",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your indoor security camera starts moving independently, and you notice unfamiliar logins to the camera's admin panel. Even after resetting the camera, the issue persists, and you can't regain control.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-07.png",
  },
  {
    id: "scenario-08",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You open an email attachment, and suddenly all your files are encrypted. A message pops up demanding payment in cryptocurrency to unlock your files. The message warns that your files will be permanently deleted if you don't pay within 48 hours.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-08.png",
  },
  {
    id: "scenario-09",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `While entering your PIN at an ATM, you notice someone standing unusually close to you. Later, you find unauthorized transactions on your account, and the bank confirms that your PIN was used at another ATM.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-09.png",
  },
  {
    id: "scenario-10",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You download a free game from an untrusted website. Soon after, your device starts behaving strangely—pop-ups appear, and you notice unauthorized programs running in the background. Your antivirus software detects malware.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-10.png",
  },
  {
    id: "scenario-11",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You try to access your favorite online gaming platform, but it's unavailable. Later, you hear that the platform was overwhelmed by a massive surge in traffic, causing it to crash. The platform confirms it was a targeted attack.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-11.png",
  },
  {
    id: "scenario-12",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You're logged into your online banking account when suddenly you're logged out. When you try to log back in, you see unfamiliar transactions. The bank confirms that someone accessed your account using your active session.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-12.png",
  },
  {
    id: "scenario-13",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You notice that your internet connection is slow, and some websites load strange content. When you check your network, you see unfamiliar devices listed as connected. Your router's ARP table shows incorrect IP-MAC mappings.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-13.png",
  },
  {
    id: "scenario-14",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You receive multiple failed login attempt notifications for your social media account. Later, you find that your account has been accessed, and spam messages were sent to your contacts.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-14.png",
  },
  {
    id: "scenario-15",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your Wi-Fi suddenly stops working, and none of your devices can connect. When you check, you notice that your router's signal is being disrupted by a nearby device emitting strong radio signals.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-15.png",
  },
  {
    id: "scenario-16",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your smart utility meter starts sending incorrect usage data to your provider, showing abnormally high consumption. You later discover a nearby attacker spoofed your meter's communication to inflate usage, possibly to trick you into overpaying or causing billing chaos.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-16.png",
  },
  {
    id: "scenario-17",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You notice your smart printer printing strange documents at random times. Investigation reveals a hacker accessed the printer remotely through an exposed port and used it to store and print malicious material.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-17.png",
  },
  {
    id: "scenario-18",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your smart refrigerator displays ads and redirects your mobile phone to phishing sites when connected to its app. You find that malware has infected the fridge's firmware, acting as a proxy to intercept traffic.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-18.png",
  },
  {
    id: "scenario-19",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your smart door lock unlocks automatically without your command while you're away. Reviewing the logs, you see access tokens were reused by an attacker intercepting previous traffic.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-19.png",
  },
  {
    id: "scenario-20",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `Your smartwatch battery drains rapidly and gets hot. A diagnostic app shows it has been constantly sending location and health data to an unknown IP. Malware was installed through a third-party app.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-20.png",
  },
  {
    id: "scenario-21",
    deck: "scenario",
    category: "scenario",
    title: "Scenario",
    body: `You're playing an online game on your gaming console, and suddenly, the system freezes and restarts. Upon reboot, all your saved data is gone. A vulnerability in the console OS was exploited to cause system-wide corruption.`,
    src: "/media/publications/cyqured/cards/scenario/scenario-21.png",
  },
];
