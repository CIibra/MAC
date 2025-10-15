<section id="adhesion">
  <h1>✍️ Rejoindre le Mouvement</h1>
  <form action="traitement.php" method="POST">
    <label for="nom">Nom complet :</label>
    <input type="text" name="nom" id="nom" required>

    <label for="email">Email :</label>
    <input type="email" name="email" id="email" required>

    <label for="telephone">Téléphone :</label>
    <input type="tel" name="telephone" id="telephone">

    <label for="region">Ville / Région :</label>
    <input type="text" name="region" id="region">

    <label for="age">Âge :</label>
    <input type="number" name="age" id="age" min="15" max="99">

    <label for="motivation">Pourquoi souhaitez-vous adhérer ?</label>
    <textarea name="motivation" id="motivation" rows="4" placeholder="Pourquoi veux-tu rejoindre le mouvement ?"></textarea>

    <label for="disponibilite">Disponibilité :</label>
    <select name="disponibilite" id="disponibilite">
      <option value="régulière">Régulière</option>
      <option value="ponctuelle">Ponctuelle</option>
      <option value="à distance">À distance</option>
    </select>

    <button type="submit">Envoyer ma demande</button>
  </form>
</section>

