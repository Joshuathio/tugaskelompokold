document.addEventListener('DOMContentLoaded', function() {
            // Slider functionality
            let currentSlide = 0;
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            
            // Clone first slide and append it to slider for infinite loop effect
            if (slides.length > 0) {
                const firstSlideClone = slides[0].cloneNode(true);
                document.querySelector('.slider').appendChild(firstSlideClone);
            }
            
            // Function to change slide
            function goToSlide(slideIndex) {
                const totalSlides = document.querySelectorAll('.slide').length;
                if (slideIndex >= totalSlides) {
                    slideIndex = 0;
                    // Quick reset without transition when looping back to first slide
                    document.querySelector('.slider').style.transition = 'none';
                    document.querySelector('.slider').style.transform = `translateX(0)`;
                    // Force reflow to make sure the quick reset is applied before adding transition again
                    void document.querySelector('.slider').offsetWidth;
                    document.querySelector('.slider').style.transition = 'transform 0.5s ease';
                }
                
                if (slideIndex < 0) {
                    slideIndex = totalSlides - 2; // -2 because we have a clone
                }
                
                document.querySelector('.slider').style.transform = `translateX(-${slideIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === slideIndex % (totalSlides - 1)) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                currentSlide = slideIndex;
            }
            
            // Add event listeners to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // Auto slide change
            setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
            
            // Product slider functionality
            function initProductSlider(sectionId) {
                console.log("Initializing slider for:", sectionId);
                
                const section = document.getElementById(sectionId);
                if (!section) {
                    console.log("Section not found:", sectionId);
                    return;
                }
                
                const slider = section.querySelector('.products-slider');
                const prevBtn = document.getElementById(`${sectionId}-prev`);
                const nextBtn = document.getElementById(`${sectionId}-next`);
                
                if (!slider || !prevBtn || !nextBtn) {
                    console.log("Slider or buttons not found for:", sectionId);
                    console.log("Slider:", slider);
                    console.log("PrevBtn:", prevBtn);
                    console.log("NextBtn:", nextBtn);
                    return;
                }
                
                // Calculate how many products fit in view
                const container = section.querySelector('.products-container');
                const containerWidth = container.clientWidth;
                const productCard = slider.querySelector('.product-card');
                
                if (!productCard) {
                    console.log("No product cards found for:", sectionId);
                    return;
                }
                
                const cardWidth = productCard.offsetWidth + 10; // Add the gap
                const visibleProducts = Math.floor(containerWidth / cardWidth);
                
                // Calculate total scroll width
                const totalProducts = slider.querySelectorAll('.product-card').length;
                const maxScrollPosition = Math.max(0, (totalProducts - visibleProducts) * cardWidth);
                
                console.log(`Slider ${sectionId} setup:`, {
                    totalProducts,
                    visibleProducts,
                    cardWidth,
                    maxScrollPosition
                });
                
                let position = 0;
                
                // Show/hide arrows based on position
                function updateArrowVisibility() {
                    // Selalu tampilkan kedua panah
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                    
                    // Alternatif: Bisa juga set opacity/disabled daripada menyembunyikan
                    prevBtn.style.opacity = position <= 0 ? '0.5' : '1';
                    nextBtn.style.opacity = position >= maxScrollPosition ? '0.5' : '1';
                }
                
                // Initial arrow visibility
                updateArrowVisibility();
                
                // Previous button click
                prevBtn.addEventListener('click', function() {
                    console.log(`${sectionId} prev button clicked, current position:`, position);
                    
                    // Jika di posisi awal, kembali ke akhir untuk loop
                    if (position <= 0) {
                        position = maxScrollPosition;
                    } else {
                        position = Math.max(position - cardWidth * visibleProducts, 0);
                    }
                    
                    console.log(`${sectionId} new position:`, position);
                    slider.style.transform = `translateX(-${position}px)`;
                    updateArrowVisibility();
                });
                
                // Next button click
                nextBtn.addEventListener('click', function() {
                    console.log(`${sectionId} next button clicked, current position:`, position);
                    
                    // Jika di posisi akhir, kembali ke awal untuk loop
                    if (position >= maxScrollPosition) {
                        position = 0;
                    } else {
                        position = Math.min(position + cardWidth * visibleProducts, maxScrollPosition);
                    }
                    
                    console.log(`${sectionId} new position:`, position);
                    slider.style.transform = `translateX(-${position}px)`;
                    updateArrowVisibility();
                });
                
                // Add debug click indicators to see if click is registered
                prevBtn.addEventListener('mousedown', function() {
                    console.log(`${sectionId} prev button mousedown`);
                    this.style.backgroundColor = '#e6e6e6';
                });
                
                prevBtn.addEventListener('mouseup', function() {
                    console.log(`${sectionId} prev button mouseup`);
                    this.style.backgroundColor = '';
                });
                
                nextBtn.addEventListener('mousedown', function() {
                    console.log(`${sectionId} next button mousedown`);
                    this.style.backgroundColor = '#e6e6e6';
                });
                
                nextBtn.addEventListener('mouseup', function() {
                    console.log(`${sectionId} next button mouseup`);
                    this.style.backgroundColor = '';
                });
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    // Recalculate variables
                    const newContainerWidth = container.clientWidth;
                    const newVisibleProducts = Math.floor(newContainerWidth / cardWidth);
                    const newMaxScrollPosition = Math.max(0, (totalProducts - newVisibleProducts) * cardWidth);
                    
                    // Reset position if it's now out of bounds
                    position = Math.min(position, newMaxScrollPosition);
                    slider.style.transform = `translateX(-${position}px)`;
                    
                    updateArrowVisibility();
                });
                
                console.log(`Slider ${sectionId} initialized successfully`);
            }
            
            // Initialize all product sliders with a small delay to ensure DOM is ready
            setTimeout(function() {
                console.log("Starting slider initialization");
                initProductSlider('new-arrivals');
                initProductSlider('recommended');
                initProductSlider('best-selling');
            }, 100);
            
            // Menu functionality - NEW ADDITION
            // Add click event to the menu icon in the top bar
            document.querySelector('.top-bar .menu-icon').addEventListener('click', function() {
                openMenu();
            });
        });
            document.querySelector('.close-menu-btn').addEventListener('click', function() {
                closeMenu();
        });
            document.getElementById('menuOverlay').addEventListener('click', function() {
                closeMenu();
        });
        
        // Menu functions - NEW ADDITION
        function openMenu() {
            document.getElementById('sideMenu').classList.add('open');
            document.getElementById('menuOverlay').classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind menu
        }
        
        function closeMenu() {
            document.getElementById('sideMenu').classList.remove('open');
            document.getElementById('menuOverlay').classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        }