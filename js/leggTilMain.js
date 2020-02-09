/**
 * 
 * ENDRE MUSEPEKER
 * 
 * Inni index.html, i <head/>, skal du legge inn en <style/>.
 * Inni der skal du skrive følgende CSS
 * .bod{
 *    cursor: url(./../assets/crosshair.png)
 * }
 * Gi <body> taggen i index.html klassen "bod"
 */

 /**
  * 
  * LASTE ASSETS
  * 
  * Legg til følgende linjer kode i preload();
  * 
  * this.load.image("back", "./../assets/bg_placeholder.png");
  * this.load.spritesheet("bgStars", "./../assets/bg_stars.png", {frameWidth: 6, frameHeight: 6});
  * this.load.spritesheet("star", "./../assets/obj_stars.png", {frameWidth: 66, frameHeight: 65}); //erstatt sjerne placeholder med denne
  */

  /**
   * 
   * FÅ SMÅ STJERNER TIL Å BLINKE I BAKGRUNNEN
   * 
   * Lag følgende globale variable
   * var stars; //De små sjernene i bakgrunnen
   * 
   * Legg til i create();
   * 
   * const bgStarcount = 100; // Sier hvor mange sjener er i bakgrunnen. Tilpass antallet hvis du føler for det
   * 
   * this.add.image(400, 300, "back");  //Får bakgrunnsbildet til å dukke opp
   * stars = this.physics.add.staticGroup();    //Gruppe som er de små stjernene
   * 
   * //Tilfeldig posisjoner av blinkende stjerner
   * let positions = [];    //Array som holder styr på hvilken plasser en har bestemt
   * let maxX = 780;        //Max og Min posisjoner for x og y
   * let minX = 20;
   * let maxY = 580;
   * 
   * //Genrerer posisjoner
   * for(let i = 0; i < bgStarcount; i++){
   *    let posX = randomPos(minX, maxX);
   *    let posY = randomPos(minY, maxY);
   *    let pos = {x: posX, y: posY};
   *    if(checkPos(pos, positions)){
   *        positions.push(pos);
   *    }
   *    else{
   *        while(!checkPos(pos, positions)){
   *            pos.x = randomPos(minX, maxX);
   *            pos.y = randomPos(minY, maxY);
   *        }
   *        positions.push(pos);
   *    }
   * }
   * 
   * //Legger stjerner til i skjermen
   * for(let i = 0; i < positions.length; i++){
   *    stars.create(positions[i].x, positions[i].y, "bgStars");
   * }
   * 
   * //Lager blinke animasjon
   * this.anims.create({
   *    key: "star",
   *    frames: this.anims.generateFrameNumbers("bgStars", {start: 0, end: 5}),
   *    frameRate: 5,
   *    repeat: -1
   * });
   * 
   * Legg til i update();
   * 
   * //Spiller av animasjonen til alle små stjerner
   * Phaser.Actions.Call(stars.getChildren(), child =>{
   *    child.anims.play("star", true);
   * });
   * 
   * //For at generering av posisjoner skal funke, må du legge til følgene funksjoner
   * 
   * function randomPos(min, max){
   *    min = Math.ceil(min);
   *    max = Math.floor(max);
   *    return Math.floor(Math.random() * (max-min+1))+min;
   * }
   * 
   * function checkPos(pos, list){
   *    let ok = true;
   *    for(let i = 0; i < list.length; i++){
   *        let xCheck = ((pos.x > list[i].x-3) && (pos.x < list[i].x+3));
   *        let yCheck = ((pos.y < list[i].y-3) && (pos.y > list[i].y+3));
   *        ok = (!xCheck || !yCheck);
   *    }
   *    return ok;
   * }
   */

   /**
    * 
    * FÅ STORE STJERNER TIL Å BLINKE
    * 
    * Legg følgende inn i create();
    * 
    * this.anims.create({
    *   key: "bigStar",
    *   frames: this.anims.generateFrameNumbers("star", {start: 0, end: 2}),
    *   frameRate: 15,
    *   repeat: -1
    * });
    * 
    * Legg deretter følgende inn i update();
    * 
    * starObj.anims.play("bigStar", true);  //starObj er et variabel navn for den stjernen som er på skjermen. Bruk hvilke  variabel det gjelder.
    */