---
title: Facts regarding communicating when a device is compromised
description: an explanation of the limitation cryptography and end to end encryption
tags:
  - Politics
  - Tech
layout: layouts/post.njk
---

> This work on  progress, check back later...

In this digital age, communicating has became so simple, easy, and almost free. However this comes with another cost, **our privacy**, and even [**survival**](/posts/shireen-abu-akleh-and-jamal-khashoggi/) for some.

This might not be a matter or a concern for most poeple. However if you are journalists, activist then it could mean your freedom, or even your life.

This article is diveded in two sections, the first section outlines some basic facts in cypersecuirty and cryptography. While the second section is focused on a practial and hands on how-tos guide, to communicate securely. However please note, while I've put a countless number of hours in researching, and studying this topic, I am not cypersecuirty or cryptography expert. So please take this guide with a grain of salt. And if you find any mistake, or have any suggestion, [please reach out](mailto:ghassan.maslamani@gmail.com). 


## Section 1: Facts and Best Practices

In this section, I outlines some facts and best practices in (cypersecurity, and cryptography). The goal of this section, firstly is to provide reader some background and contxt in this field and secondly to provide a foundation for the next section. In this section, I make use of the term **fact**, 

### Fact 1 (Assumed Breach)

> __We can never be certain that our devices are 100% secured, so we assume our that our devices are compromised__.

Putting cypersecurity aside...Here we are just considering the **worst case scenario**, and this is not a new concept, it's an axiom in risk management, engineering, and many other fields.

Back to cypersecuirty, there is a model or archtecture called **Zero Trust**, where you assume that your network/device is already compromised, and you build your security around this assumption. 

### Fact 2 (E2EE limitation)

> End to end encryption is not enough to protect your communication if your device is compromised.

Let's take a step back, and note that end to end encryption means is that: data is **encrypted while on transit**. In other words, when an e2e communication medium is e2e like (whatsapp, telegram, or signal ..etc) is going to procetct your data while it's on **transit**, but not necessary when your data is safe while it's **on your device** (hence the frist fact). 


_But wait, does this mean end-to-end encryption is useless?_

Is the safety belt useless because it cannot protect aginst an excavator accident? 

Again here we are always assuming the worst most extreme case scenario.

### Fact 3 (Air Gapped)

> A compromised device cannot leak information if it's not connected to the internet or any other device.

Ths is just how physics work, no?, How can data be transfered from a device if it's never connected to other device.

There is a whole concept of **air gap** security, where a device is never connected to the internet or any other device, which is used in military, banking, and other high security sectors.
    
A device can connect to other through:

- Wifi
- LAN cable
- Bluetooth
- NFC
- USB
- FM tramission

### Fact 4

> A device doesn't need to be connected to the internet or other device in order to do encryption or decryption.

Well this how encryption works, a device just need certain data like **private key** or a secret, you can even do this on a paper, but it's not practical.

### Fact 5 (Encrypted data)

> An encrypted message is okay to be **transferd** through a compromised device or to be leaked

Ultimatly, encryption main goal, is that anyone who get access wouldn't be able to decyprt it. 

Note this is dones't go in odds with the first fcat, this because when we are using **a device to transfer a cipher is totally different than when we use a device to encrypt a text a cipher**, this very important to distigush between. 


Well we have to agree on this point, the point of encryption is to make it impossibe to read to decrypt a cipher message without certian info like **private key**. So even if the message is intercepted by a malicious actor, it's still safe.



The whole cryptography is based on this fact, if don't agree with this fact, I can understand you. But I dpn't think there is a point to continue reading this guide. Nonethless I would welcome your suggestion.

There are cases where encrytion is broken but 95% of the time, the reason is an **implementation error**, not the encryption algorithm itself or the math behind is broken.


## End of secion 1

Okay we got

Okay so far we can conculed, that all our devices are compromised, however if we disconnect those devices from the internet, we can safely perform encryption and decryption.

But how can an offline device recive or send an encrypted message if it's not connected to the internet or any other device?

- Post mail
- Use other

So far we can conculde that if we can use a comproised device online device to share encrypted message, and comprpomised offline device to do the encryption and decryption.

_But how to transfer an encrypted message from offline device to online device and vice versa_?

This is the last part which is very important, and it's the reason why this method might not be practical for everyone.

There are three main options to transfer data from offline device to online device:

- **Take photo Screenshots** _Taking screenshot of the text and sending it to the online device_
  - OCR Optical Character Recognition, this involves taking a photo of the text and using an OCR tool to extract the text.
  - **QR Code** - This involves converting the text to a QR code and scanning it with your online device.
- **Manual Typing** - While this me

Put those facts togather, and you

In the digital age, we are constantly communicating through phones, computers, and other devices. While end-to-end encryption has become the gold standard for securing our communications, what happens if your device is compromised? Unfortunately, encryption alone cannot protect you if the device transmitting or receiving messages is under the control of a malicious actor.

Consider the following scenario: You rely on encrypted apps to communicate, but if your device is compromised, attackers could bypass encryption, monitor your activity, or steal sensitive information. This problem becomes especially acute for individuals in high-stakes situations, such as journalists, activists, or anyone handling confidential communications.

A Key Consideration

If the integrity of our devices cannot be trusted, how can we still ensure secure communication?

---

## Section 2: a practial guide to communicate securely

Please note I am not a cypersecuirty expert, while I have been thinking, studying, and researching this topic for months..., even the most experienced cypersecurity/cryptography could and (offen do) make mistakes. You cannot imagine how a very simple/innocent mistake; could expose privacy or secuirty of millions of people!.


The main idea is simple, it's based on "air gapped" concept, where the device that does encrypting and decrypting is never connected to the internet or any other device. 


The solution mainly is to  use at **offline device** for cryptographic operations, and an **online device** communication. These devices never connect to the internet and are isolated from external interference. By making specific preparations and following strict guidelines, you can use such devices to send and receive encrypted messages securely.

### Key Principles

1. **Air Gap:** The device used for encryption/decryption must not connect to the internet or any other device under any circumstances.
2. **No Wireless Communication:** Disable or physically remove all wireless communication components, such as Wi-Fi, Bluetooth, and NFC.
3. **Physical Security:** Store the offline device in a secure location, and ensure it is protected from unauthorized access.
4. **Accept Usability Trade-Offs:** Security and convenience are often at odds. This approach prioritizes security over ease of use.

---

### Preparation and Communication Process

### Preparation

#### Step 1: Have an offlice device

- **Use an old device you no longer need.** Laptops are preferable and desktops are even better since they are easier to dismantle and modify.
- Obtain the device randomly (e.g., from a secondhand store in a different city) to avoid traceability.

#### Step 2: Prepare the Offline Device

- **Install Necessary Software:** Before going offline, ensure the device has all required libraries and software for encryption, decryption, and key generation. Here are some free tools based on your offline device's operating system:


| Operating System | Free Tool                                   |
| ------------------ | --------------------------------------------- |
| Windows          | Gpg4win (https://gpg4win.org/)              |
| macOS            | GPG Suite (https://gpgtools.org/)           |
| Linux            | GnuPG (pre-installed on most distributions) |

- **Disable Internet Access:**
  - Software: Set the device to Airplane Mode and disable Bluetooth and Wi-Fi.
  - Hardware: Physically remove wireless communication components. Search for guides like `How to replace Wi-Fi adapter [device model]` for step-by-step instructions.

> [!CAUTION]
> From this point on, the offline device should never connect to the internet. This is very important.

> [!TIP]
> From now on, I will assume your software of use is **GPG suite for macOS**, for demonstration purpose. But you should be replicate every step on any other.

#### Step 3: Generate key pairs

> [!NOTE]
> This step involves transfering data **from offline device to online device**, [see offline to online guide below](#offline-to-online-guide)

- On the offline device use the GPG tool to generate a key pair.
- Export the key pair, this will create a file with `asc` extension.
- Open the file using the `TextEdit` app.
- Using your mobile take a photo of the public key window.
- Share the photo/key with your friend partner.

> [!TIP]
> Before taking a screenshot of public key window, format the text with an OCR friendly font, I used **Tahoma**. in below screenshot

![GPG Public Key scroonshot](/img/gpg-public-key.png "eeeeeeeeeeee")

#### Step 4: Import other people's public keys

> [!NOTE]
> This step involves transfering data **from online device to offline device**, [see online to offline guide below](#online-to-offline-guide)

- Open an empty text file and paste the public key of your friend.
- If your friend has sent you a photo of the public key, use OCR to extract the text.
- Open
- Save the file with `.asc` extension.
- Import the public key using the GPG tool. (right click on the select open with Open GPG Keychain)

### Communication Process

#### Step 5: Sending Messages/Encrypting Messages:

1. Open TextEdit and write your message.
2. Select the text and right click on it, select `Services` and then `OpenPGP: Encrypt Selection`
3. Select the public key of the recipient.
4. Now the text is encrypted, you can take photo of the encrypted text and send it to your friend or partner.

#### Step 6: Receiving Messages/Decrypting Messages:

1. **Transfer Encrypted Messages Offline:**
   - The recipient’s online device captures the encrypted message and displays it.
   - Use the offline device to scan or type the encrypted message.
2. **Decrypt Messages:**
   - Use the offline device and GPG with your private key to decrypt the message.
3. **Post-Decryption:**
   - Delete sensitive decrypted messages after use. For important information, store it on paper instead of digitally.

---

### Maintaining Offline Devices

### Challenges:

1. **Updating Software:**
   - If software updates are required, they must be downloaded on a separate device, verified for integrity, and transferred via trusted means (e.g., optical discs).
2. **Renewing Key Pairs:**
   - Periodically generate new key pairs and securely share public keys.
3. **Data Transfers:**
   - Avoid using USB drives, as they may carry malware.
   - Opt for manual methods such as OCR or visual transfer.

---

### Final Considerations

### Social Security

No matter how careful you were 

- Physical security is crucial. Limit access to your offline device and store it in a secure, private location.
- Choose a private and trusted location without CCTV or public surveillance to perform sensitive operations

### Practicality vs. Security

- This method is highly secure but requires significant effort. It is most appropriate for individuals facing serious security risks.

---

By following these principles and processes, you can communicate securely even in an environment where online devices are compromised. While this method involves trade-offs between usability and security, it ensures that your sensitive communications remain protected from prying eyes.

### Transferring text from offline device to online device and vice versa

Recall earlier, we said this method trade-off usability for security.
In this state, we have two devices in close proximity,

You have three main options to transfer data from offline device to online device[^what]:

1. **OCR** - Optical Character Recognition, this invol[^3]ves taking a photo of the text and usin[^hwww]g an OCR tool to extract the text.

- Make sure to use a friendly font like Tahoma.[^1]

2. **Manual Typing** - This involves typing the text manually. Very time consuming
3. **QR Code** - This involves converting the text to a QR code and scanning it with your online device.
   This probably the most starighforward method, the only disadvantage is that you would probably need to create multiple QR code for long text.

The don'ts:

- Don't use bluetooth, Wi-Fi, or any wireless communication[^2].

### Online to offline guide

## Refs

[^1]: List of _publicly known_ private companies which their whole business is to build software to spy people: [https://xorl.wordpress.com](https://xorl.wordpress.com/offensive-security-private-companies-inventory/).
[^2]: https://stackoverflow.com/questions/316068/what-is-the-ideal-font-for-ocr
[^3]: https://github.com/ggerganov/ggwave

- https://blog.cryptographyengineering.com/2024/08/25/telegram-is-not-really-an-encrypted-messaging-app/
