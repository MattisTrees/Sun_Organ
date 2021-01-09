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
                Homework 1 was huge challenge for me. CSS can be frustrating as
                there are many attributes to mess around with and it's not always
                clear what you should be manipulating. Float is a difficult concept to
                wrap your head around, display has a 'none' value but it's 'initial' value
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
                SQL is still a bit new to me. Putting together databases seems like
                pretty intuitive way to put tables together. The next step to learn
                is just how to call and display this information.
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
                <a href="js/tutorial/proposal.pdf">
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
    
        <div class="post">
    
            <h1>Homework 8 - Insert</h1>
    
            <h3>What I learned</h3>
            <p>
                I learned how to automate database insertions. I think this project
                will be a great addition to my portfolio as I've realized that it's
                pretty much your basic CRUD application and from what I understand
                it's that most web apps are exactly that. I learned more about the
                javascript language and more and more reasons why I don't like it.
                I learned a little bit about how to make a pick list and how to populate
                it. I don't thin its totally worth it to make a pick list (unless
                there is some other simpler way to do it as you need to have several
                other files and database calls just to populate it. I imagine it 
                might be more effecient to keep more things in the session object
                for more local access to make things like this a little simpler.
            </p>
    
            <h3>What if found easy/hard</h3>
            <p>
                This one was pretty crazy. I still don't think I fully understand 
                ajax calls, or how gson->json->gson conversion happens. The difficult
                parts were trying to figure out how some of the tools provided by
                the professor work, things like validation, and her dbmods in the model
                package. Once I figured that out then It all came together.'
            </p>
    
        </div>
    
        
        <div class="post">
    
            <h1>Homework 9 - Update</h1>
    
            <h3>What I learned</h3>
            <p>
                I learned that you can reuse a lot of code from Insert for Update
                once insert is done. It takes a couple more files and data structures
                to get done. This is something I would like to fix about this WebApp
                before really showing it off on my portfolio. Other than that there
                weren't too many snags. I learned that Results require a results.next()
                call before you can manipulate the data within which doesn't make much
                intuitive sense but overall it was a pretty easy Homework.
            </p>
    
            <h3>What if found easy/hard</h3>
            <p>
                Other than the confusing behavior of results this homework was very
                close to the insert homework.
            </p>
    
        </div>
    
    </div> <!-- Blog-Wrapper div -->
        
`;
    
    document.getElementById("view").innerHTML = content;
} // end blog function