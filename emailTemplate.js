// Génère le HTML du mail de confirmation APEX à partir des données de réservation.
export function confirmationEmail({ prenom, formule, manche, equipage, reference, montant }) {
  const annee = new Date().getFullYear();
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#07080B;margin:0;padding:0;">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#0b0d14;border:1px solid #1c2432;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
    <tr><td style="height:4px;background-color:#25E6FF;font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td align="center" style="padding:34px 30px 6px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="border:3px solid #25E6FF;border-radius:8px;padding:6px 16px;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:34px;font-weight:900;font-style:italic;color:#FF2E9A;line-height:1;">A</span>
        </td>
      </tr></table>
    </td></tr>
    <tr><td align="center" style="padding:12px 30px 0;">
      <div style="color:#25E6FF;font-size:13px;letter-spacing:4px;font-weight:bold;">APEX &middot; RACING EXP&Eacute;RIENCE</div>
    </td></tr>
    <tr><td align="center" style="padding:26px 30px 4px;">
      <div style="color:#D6FF3B;font-size:12px;letter-spacing:2px;font-family:'Courier New',monospace;">// R&Eacute;SERVATION CONFIRM&Eacute;E</div>
    </td></tr>
    <tr><td align="center" style="padding:6px 30px 0;">
      <div style="color:#ffffff;font-size:30px;font-weight:900;font-style:italic;font-family:Arial Black,Arial,sans-serif;line-height:1.15;">TA PLACE EST R&Eacute;SERV&Eacute;E&nbsp;&#127937;</div>
    </td></tr>
    <tr><td style="padding:22px 40px 6px;">
      <p style="color:#c9d4de;font-size:15px;line-height:1.65;margin:0;">
        Bonjour <strong style="color:#ffffff;">${prenom}</strong>,<br><br>
        Merci&nbsp;! Ta r&eacute;servation pour le championnat <strong style="color:#ffffff;">APEX Racing Exp&eacute;rience</strong> est bien enregistr&eacute;e. Voici le r&eacute;capitulatif&nbsp;:
      </p>
    </td></tr>
    <tr><td style="padding:18px 40px 4px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#05060a;border:1px solid #1c2432;border-radius:12px;">
        <tr><td style="padding:14px 18px;border-bottom:1px solid #141b26;color:#7f8fa0;font-size:12px;letter-spacing:1px;">FORMULE</td>
          <td align="right" style="padding:14px 18px;border-bottom:1px solid #141b26;color:#ffffff;font-size:14px;font-weight:bold;">${formule}</td></tr>
        <tr><td style="padding:14px 18px;border-bottom:1px solid #141b26;color:#7f8fa0;font-size:12px;letter-spacing:1px;">MANCHE / COURSE</td>
          <td align="right" style="padding:14px 18px;border-bottom:1px solid #141b26;color:#ffffff;font-size:14px;font-weight:bold;">${manche}</td></tr>
        <tr><td style="padding:14px 18px;border-bottom:1px solid #141b26;color:#7f8fa0;font-size:12px;letter-spacing:1px;">&Eacute;QUIPAGE</td>
          <td align="right" style="padding:14px 18px;border-bottom:1px solid #141b26;color:#ffffff;font-size:14px;font-weight:bold;">${equipage}</td></tr>
        <tr><td style="padding:14px 18px;border-bottom:1px solid #141b26;color:#7f8fa0;font-size:12px;letter-spacing:1px;">R&Eacute;F&Eacute;RENCE</td>
          <td align="right" style="padding:14px 18px;border-bottom:1px solid #141b26;color:#25E6FF;font-size:14px;font-weight:bold;font-family:'Courier New',monospace;">${reference}</td></tr>
        <tr><td style="padding:16px 18px;color:#D6FF3B;font-size:13px;letter-spacing:1px;font-weight:bold;">MONTANT</td>
          <td align="right" style="padding:16px 18px;color:#D6FF3B;font-size:20px;font-weight:900;">${montant}&nbsp;&euro;</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:22px 40px 0;">
      <div style="color:#FF2E9A;font-size:13px;letter-spacing:1px;font-weight:bold;margin-bottom:8px;">// PROCHAINES &Eacute;TAPES</div>
      <p style="color:#c9d4de;font-size:14px;line-height:1.7;margin:0;">
        &bull;&nbsp;Nous te recontactons avec la <strong style="color:#fff;">date et les infos pratiques</strong> de ta manche.<br>
        &bull;&nbsp;Pense &agrave; <strong style="color:#fff;">compl&eacute;ter ton &eacute;quipage</strong> (2 &agrave; 3 pilotes / 3 &agrave; 6 pour la finale).<br>
        &bull;&nbsp;Une question&nbsp;? R&eacute;ponds simplement &agrave; ce mail.
      </p>
    </td></tr>
    <tr><td align="center" style="padding:26px 40px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="background-color:#D6FF3B;border-radius:30px;">
          <a href="https://www.instagram.com/apex.racing.experience21000" style="display:inline-block;padding:14px 32px;color:#05060a;font-size:14px;font-weight:900;text-decoration:none;letter-spacing:1px;">SUIVRE APEX SUR INSTAGRAM &#127937;</a>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:24px 40px 34px;border-top:1px solid #141b26;">
      <p style="color:#6b7a8a;font-size:12px;line-height:1.7;margin:14px 0 0;text-align:center;">
        <strong style="color:#9fb0bd;">APEX Racing Exp&eacute;rience</strong> &mdash; Championnat d'endurance karting<br>
        aegertervictor1@gmail.com &nbsp;&middot;&nbsp; @apex.racing.experience21000<br>
        <span style="color:#4a5866;">Cet e-mail confirme ta demande de r&eacute;servation. Il ne vaut pas facture.</span>
      </p>
    </td></tr>
  </table>
  <div style="color:#3a4653;font-size:11px;font-family:Arial;padding-top:14px;">&#127937; APEX Racing Exp&eacute;rience &middot; ${annee}</div>
</td></tr>
</table>`;
}
