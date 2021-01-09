function home(){
    
    // ` this is the infamous back tick, you don't have to worry about that you have NetBeans 8.2
    
    var content = `
        <div id="cell-view">
            
            <div id="cell-view-inner">
                <a href="SelfTitled.html"><img src="pics/Album_images/SunOrgan.jpg" alt="Self Titled"></a>
                <a href="YourDoomed.html"><img src="pics/Album_images/YourDoomed.jpg" alt="Your Doomed"></a>
                <a href="SDFR.html"><img src="pics/Album_images/SDFR.jpg" alt="Something Doesnt Feel Right"></a>
                <a href="PITDITD.html"><img src="pics/Album_images/PITDITD.jpg" alt="People in the Distance in the Dark"></a>
                <a href="Split.html"><img src="pics/Album_images/SOTCI.jpg" alt="Split w/ The City and I"></a>
                <a href="WoodenBrain.html"><img src="pics/Album_images/WoodenBrain.jpg" alt="Wooden Brain"></a>
            </div>
        </div>
        
        <div id="normal-view">
            
            <div class="wrapper">
                <article class="img-info">
                    <h2>YAY!</h2>
                    <p>
                        sUN oRGAN IS A BAND FROM pHILADELPHIA, pa. tHEY PLAYS SHOWS. hERE WE WILL
                        HOST A LITTLE BIT OF INFO ABOUT THE BAND AND HOPEFULLY EVENTUALLY
                        HOST THE ALBUMS FOR INFINITE STREAMING AND UPDATES ON SHOWS AND 
                        PICTURES OF SHOWS. uNTIL THEN YOU CAN VISIT  
                        <a href="https://sunorgan.bandcamp.com">THEIR PAGE ON BANDCAMP</a>.
                    </p>
                </article>
                <img class="img-theBand" src="pics/SunOrganBand.jpg" alt="tHE gODS tHEMSELVES">
            </div>
            
        </div>
`;
    
    document.getElementById("view").innerHTML = content;
}
