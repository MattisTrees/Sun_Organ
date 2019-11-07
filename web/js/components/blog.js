function blog(){
    var content = `
    <div id="blog-wrapper">
    
        <div class="post">
    
            <h1>Homework 1 - Home Page</h1>
            <h3>What I learned</h3>
            <p>
                I re-learned how to develop a web page working with just HTML and CSS. 
                I learned a little bit about how JavaScript works and how to animate some
                menus with it. 
            </p>

            <h3>What if found easy/hard</h3>
            <p>
                Homework 1 was huge challenge for me. CSS is extremely frustrating as
                there are just too many attributes to mess around with and it's not always
                clear what you should be manipulating. Float is a difficult concept to
                wrap your head around, display has a 'none' value but it 'initial' value
                doesn't seem to undo the invisibility, neither does block or any of the
                other values (in my experience, I realize I was most likely doing something
                wrong).
            </p>
    
        </div>
    
    <div class="post">
    
            <h1>Homework 2 - Part 1: Data Base</h1>
    
            <a href="Matthew-Jordan-HW2-DB.docx">Link to the word document</a>
    
            <h3>What I learned</h3>
            <p>
                I didn't a WHOLE lot about how databases work. I didn't realize
                that this class kind of assume a little bit of database and SQL know-how.
                Luckily I'm also taking intro to databases concurrently with this course.
                But it's cool to work with a professional tool such as MySQLWorkbench
                and see a nice easy GUI method of putting together a database. The 
                cool thing is that before the tables are ever created or altered
                the program shows you the SQL command that will make the changes.
            </p>

            <h3>What if found easy/hard</h3>
            <p>
                SQL is a little bit of a challenge to me. I only recently learned
                that servers and databases are essential know-how to get a job in 
                this field. Luckily after this semester I'll be one step closer to 
                having a full knowledge base that will be practical in the field. 
                I'm just not excited at the prospect of learning a whole 'nother
                language that works radically differently than actual programming
                languages.
            </p>
    
        </div>
    
        <div class="post">
    
            <h1>Homework 2 - Part 2: Routing</h1>
            <h3>What I learned</h3>
            <p>
                I learned a bit more about the way javascript works; How weirdly
                that arrays behave (more like hashmaps). Makes me wonder how itterating
                through arrays in javascript works. Im sure we'll do that manually
                soon. Routing is interesting though. I like it alot. It really simplifies 
                things as far as number of pages required for a project (sort of).
                I do wonder how much load it actually saves. I mean, are we just 
                taking the load of headers and footers off of the browswer with it?
            </p>

            <h3>What if found easy/hard</h3>
            <p>
                It really wasn't TOO too hard for me. I studied the sample code 
                from the simplest example to the more complicated ones and once
                I got the hang of it I emulated the sample code onto my code and 
                lucky for me it pretty much worked on my first try (must be some 
                kind of miracle). That's not to say that a lot of tweaking took place
                but conceptually I had it working pretty quickly.
            </p>
    
        </div>
    
        <div class="post">
    
            <h1>Homework 3 - Web APIs</h1>
    
            <h3>What I learned</h3>
            <p>
                I learned how frustrating it is to get anything done on the web.
                I learned how database connections are made and how SQL statements
                are handeled on the back end of a web application. I learned a little
                bit about takinga a JSON file or a POJO and converting it to display
                on a web page, and that there is not actual need to have a JSON file
                at all, as it can be abstracted into a class and then actually wielded
                with a toString method. 
            </p>

            <h3>What if found easy/hard</h3>
            <p>
                This whole assignment was daunting as heck. Despite being very familiar
                with programming in general and even some familiarity with port 
                connections I had a hard time knowing what I was doing at first.
                It does make sense to write the backend code first but doing for
                the first time is a pretty confusing enterprise. Once everything
                started comming together a little bit and I started working closer
                to the front end it became much clearer how everything works together.
            </p>
    
            <p> Click <a href="HW3-dbErrors.docx">here</a> to my document that shows
                how to create and fix database errors.
            </p>
    
        </div>
    
        <div class="post">
    
            <h1>Homework 4 - Display Data</h1>
    
            <h3>What I learned</h3>
            <p>
                I basically just learned how to encapsulate a function to be called
                in an ajax call. In this case, the function creates a table based
                on information in a database.
            </p>

            <h3>What if found easy/hard</h3>
            <p>
                I think probaby the hardest part was making the sorting algorithm
                go backward on the clink that sorts the table for each hearder.
            </p>
    
        </div>
    
        <div class="post">
    
            <h1>Homework 5 - Totorial Proposal</h1>
    
            <h3>What I learned</h3>
            <p>
                So far I learned how to get an element to animate based on some 
                input from the user. The pong game I wish to make is going to be
                very simple. The last priority I have is going to be the scoring 
                and the reset, as well as any aesthetic problems the game has.
                See the 
                <a href="js/tutorial/Simple-Pong-Game-Using-JavaScript.pdf">
                    document
                </a> 
                for more details.
            </p>
    
        </div>
    
        <div class="post">
    
            <h1>Homework 6 - Log On/Off</h1>
    
            <h3>What I learned</h3>
            <p>
                Phew! What a freaking assignment. I learned that I never ever want
                to do front-end development full time as there are just too many 
                files to work with. Other than that it was a good time learning to
                work with .jsp pages and exactly what they were. Writing the API's
                were confusing at first as it's a little difficult to know what the 
                flow of the program is but once you really dig in and figure it out
                it stops being so scary (but can still be pretty confusing at times).
            
            </p>
    
            <h3>What if found easy/hard</h3>
            <p>
                I think one of the harder things to keep in mind is exactly what the
                ajax call does (specifically the ajax2 call). Another weird thing   
                is that I kind of have no idea what this gson-to-json functionality
                does. It seems like it's more or less the 'return' of the .jsp file
                because the 'obj' doesn't get populated and the success function 
                doesnt seem to be able to run without it, but I have not clue what 
                is behind the curtain there.
            </p>
    
        </div>
    
        
        <div class="post">
    
            <h1>Homework 7 - Delete</h1>
    
            <h3>What I learned</h3>
            <p>
                This one wasn't to bad. I learned that in java you need to call a
                different function if there's no expected return for the SQL call.
                Instead of 'executeQuery' you need to call 'executeUpdate'.  
            </p>
    
            <h3>What if found easy/hard</h3>
            <p>
                The hard part here was figuring out how to update the tables with 
                the proper things to call the Delete query, I tried like a billion things
                but finally found the right way to do it.
            </p>
    
        </div>
    
    </div> <!-- Blog-Wrapper div -->
        
`;
    
    document.getElementById("view").innerHTML = content;
} // end blog function