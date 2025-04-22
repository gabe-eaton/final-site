$(document).ready(function() {
    // Verify jQuery and jQuery UI are loaded correctly
    if (typeof $.ui === 'undefined') {
        console.error('jQuery UI is not loaded properly');
        return;
    }
    
    // -----------------------------------------------
    // jQuery Autosuggest/Predictive Search Functionality
    // -----------------------------------------------
    
    // Sample data for search autocomplete - combines skills and projects
    const searchData = [
        // Skills
        "HTML/CSS", "JavaScript", "jQuery", "React", "Node.js", "Python", 
        "React.js", "Node.js", "Spring Boot", "AWS", "C++", "Software Engineering",

        // Projects
        "Nutrify", "FlameExchange", "RotAlert", "Portfolio Website",
        "App", "Project"
    ];
    
    // Initialize autocomplete on search input
    if ($("#search-input").length) {
        try {
            $("#search-input").autocomplete({
                source: function(request, response) {
                    // Custom filtering logic
                    const term = request.term.toLowerCase();
                    const matches = searchData.filter(item => 
                        item.toLowerCase().indexOf(term) !== -1
                    );
                    
                    response(matches);
                },
                minLength: 2, // Start suggesting after 2 characters
                select: function(event, ui) {
                    // Handle selection - redirect to appropriate page
                    const selection = ui.item.value;
                    
                    // Check if selection is a project
                    if (selection.includes("Website") || selection.includes("App") || 
                        selection.includes("Platform") || 
                        selection.includes("Nutrify") || 
                        selection.includes("RotAlert") || 
                        selection.includes("FlameExchange") || selection.includes("Dashboard")) {
                        window.location.href = "portfolio.html";
                    } 
                    // If it's a skill
                    else {
                        window.location.href = "skills.html";
                    }
                }
            }).autocomplete("instance")._renderItem = function(ul, item) {
                // Custom rendering of autocomplete items with highlighting
                const term = this.term.trim().split(/\s+/).join('|');
                const regex = new RegExp("(" + term + ")", "gi");
                const highlightedText = item.label.replace(regex, '<span class="highlight">$1</span>');
                
                return $("<li>")
                    .append("<div>" + highlightedText + "</div>")
                    .appendTo(ul);
            };
            
            console.log("Autocomplete initialized successfully");
        } catch (error) {
            console.error("Error initializing autocomplete:", error);
        }
    } else {
        console.warn("Search input element not found");
    }
    
    // Add custom styling to autocomplete dropdown
    $("<style>")
        .prop("type", "text/css")
        .html(`
            .ui-autocomplete {
                max-height: 300px;
                overflow-y: auto;
                overflow-x: hidden;
                z-index: 9999 !important;
                border: 1px solid #ddd;
                background: #fff;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .ui-autocomplete .highlight {
                font-weight: bold;
                color: var(--primary, #2a7ae2);
            }
            .ui-menu-item {
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            .ui-menu-item:hover {
                background-color: #f5f5f5;
            }
            .ui-helper-hidden-accessible {
                display: none;
            }
        `)
        .appendTo("head");
    
    // -----------------------------------------------
    // jQuery Effect 1: Fade effect for portfolio items
    // -----------------------------------------------
    if ($(".portfolio-item").length) {
        // Ensure overlay elements exist first
        $(".portfolio-item").each(function() {
            if ($(this).find(".portfolio-overlay").length === 0) {
                console.warn("Portfolio overlay not found for an item");
            }
        });
        
        $(".portfolio-item").hover(
            function() {
                // Mouse enter - fade in overlay
                $(this).find(".portfolio-overlay").stop().fadeIn(300).css("opacity", "1");
            },
            function() {
                // Mouse leave - fade out overlay
                $(this).find(".portfolio-overlay").stop().fadeOut(300);
            }
        );
    }
    
    // -----------------------------------------------
    // jQuery Effect 2: Slide effect for project details
    // -----------------------------------------------
    
    // Hide all project details initially
    $(".project-details").hide();
    
    if ($(".project-title").length) {
        $(".project-title").click(function() {
            // Toggle active class for styling
            $(this).toggleClass("active");
            
            // Get the associated details panel
            const details = $(this).next(".project-details");
            
            if (details.length === 0) {
                console.warn("Project details not found for:", $(this).text());
                return;
            }
            
            // Slide toggle with animation
            details.slideToggle(400);
            
            // Close other open panels
            $(".project-details").not(details).slideUp(400);
            $(".project-title").not($(this)).removeClass("active");
        });
    }
    
    // -----------------------------------------------
    // jQuery Effect 3: Animate for form submission feedback
    // -----------------------------------------------
    if ($("#contactForm").length) {
        $("#contactForm").submit(function(e) {
            e.preventDefault();
            
            // Validate form (simple validation)
            let isValid = true;
            $(this).find("input[required], textarea[required]").each(function() {
                if ($(this).val().trim() === "") {
                    isValid = false;
                    $(this).css("border-color", "red").animate({
                        borderWidth: "2px"
                    }, 300);
                } else {
                    $(this).css("border-color", "var(--gray, #ddd)");
                }
            });
            
            if (isValid) {
                // Hide form with slide effect
                $(this).slideUp(500, function() {
                    // Check if formResponse exists, if not, create it
                    if ($("#formResponse").length === 0) {
                        $(this).after('<div id="formResponse"></div>');
                    }
                    
                    // Show success message with fade in
                    $("#formResponse")
                        .html("<p class='success-message'>Thank you for your message! I'll get back to you soon.</p>")
                        .hide()
                        .fadeIn(800);
                        
                    // Reset the form
                    this.reset();
                    
                    // Show form again after 5 seconds
                    setTimeout(function() {
                        $("#contactForm").slideDown(500);
                        $("#formResponse").fadeOut(500);
                    }, 5000);
                });
            }
        });
    }
    
    // -----------------------------------------------
    // jQuery Effect 4: Smooth scrolling for navigation
    // -----------------------------------------------
    $("a[href^='#']").on("click", function(event) {
        if (this.hash !== "") {
            // Make sure the element with this hash exists
            if ($(this.hash).length === 0) {
                console.warn("Scroll target not found:", this.hash);
                return;
            }
            
            event.preventDefault();
            const hash = this.hash;
            
            // Animate smooth scroll
            $("html, body").animate({
                scrollTop: $(hash).offset().top - 70
            }, 800, function() {
                // Add hash to URL after scroll (optional)
                window.location.hash = hash;
            });
        }
    });
    
    // -----------------------------------------------
    // Log when DOM is fully loaded
    // -----------------------------------------------
    console.log("DOM fully loaded and jQuery functionality initialized");
});