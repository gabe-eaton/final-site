/**
 * final.js - Chart.js Implementation for Portfolio Website
 * This file contains the code for data visualization on the Skills page
 * using the Chart.js library.
 * 
 * The file creates two charts:
 * 1. A bar chart showing skill levels in different technologies
 * 2. A pie chart showing project distribution by type
 */

document.addEventListener('DOMContentLoaded', function() {
    // -----------------------------------------------
    // Chart 1: Skills Bar Chart
    // -----------------------------------------------
    
    // Get the canvas element for the skills chart
    const skillsChart = document.getElementById('skills-chart');
    
    // Only proceed if the element exists (we're on the skills page)
    if (skillsChart) {
        // Data configuration for the skills bar chart
        const skillsData = {
            // Labels for each skill category
            labels: ['Python', 'JavaScript', 'C++', 'React', 'Node.js', 'Spring Boot'],
            
            // Dataset configuration
            datasets: [{
                label: 'Skill Level (out of 100)',
                // Skill ratings on a scale of 0-100
                data: [90, 85, 90, 90, 80, 60],
                
                // Colors for each bar (background and border)
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',   // Red (Python)
                    'rgba(54, 162, 235, 0.7)',   // Blue (JavaScript)
                    'rgba(255, 206, 86, 0.7)',   // Yellow (jQuery)
                    'rgba(75, 192, 192, 0.7)',   // Teal (React)
                    'rgba(153, 102, 255, 0.7)',  // Purple (Node.js)
                    'rgba(255, 159, 64, 0.7)'    // Orange (UI/UX)
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        // Chart configuration options
        const chartConfig = {
            type: 'bar', // Bar chart type
            data: skillsData,
            options: {
                // Make chart responsive to window size
                responsive: true,
                
                // Custom plugins configuration
                plugins: {
                    // Chart title configuration
                    title: {
                        display: true,
                        text: 'My Technical Skills',
                        font: {
                            size: 18
                        }
                    },
                    // Hide legend since colors are decorative
                    legend: {
                        display: false
                    },
                    // Add tooltip configuration
                    tooltip: {
                        callbacks: {
                            // Custom tooltip text
                            label: function(context) {
                                return `Proficiency: ${context.raw}/100`;
                            }
                        }
                    }
                },
                
                // Axes configuration
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Proficiency Level'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Technology'
                        }
                    }
                },
                
                // Animation configuration
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        };
        
        // Create and render the skills chart
        new Chart(skillsChart, chartConfig);
    }
    
    // -----------------------------------------------
    // Chart 2: Projects Pie Chart
    // -----------------------------------------------
    
    // Get the canvas element for projects chart
    const projectsChart = document.getElementById('projects-chart');
    
    // Only proceed if the element exists
    if (projectsChart) {
        // Data for the projects pie chart
        const projectData = {
            // Project categories
            labels: ['Web Apps', 'API Development', "Machine Learning"],
            
            // Dataset configuration
            datasets: [{
                label: 'Projects Completed',
                // Number of projects in each category
                data: [18, 10, 5],
                
                // Colors for pie segments
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',  // Blue
                    'rgba(255, 99, 132, 0.7)',   // Red
                    'rgba(255, 206, 86, 0.7)',   // Yellow
                    'rgba(75, 192, 192, 0.7)'    // Teal
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        // Configuration for pie chart
        const projectChartConfig = {
            type: 'pie',  // Pie chart type
            data: projectData,
            options: {
                responsive: true,
                
                // Custom plugins configuration
                plugins: {
                    // Chart title
                    title: {
                        display: true,
                        text: 'Project Distribution',
                        font: {
                            size: 18
                        }
                    },
                    // Show legend for pie chart categories
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20
                        }
                    },
                    // Custom tooltip
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} projects (${percentage}%)`;
                            }
                        }
                    }
                },
                
                // Animation configuration
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000
                }
            }
        };
        
        // Create and render the projects pie chart
        new Chart(projectsChart, projectChartConfig);
    }
    
    // -----------------------------------------------
    // Additional Chart: Skills Progression over time
    // -----------------------------------------------
    
    // Get the canvas element for the timeline chart
    const progressChart = document.getElementById('progress-chart');
    
    // Only proceed if the element exists
    if (progressChart) {
        // Data for the progress line chart
        const progressData = {
            // Time periods (years)
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            
            // Multiple datasets for different skills
            datasets: [
                {
                    label: 'JavaScript',
                    data: [50, 60, 68, 75, 82, 85],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'React',
                    data: [20, 35, 48, 60, 70, 75],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'UI/UX Design',
                    data: [40, 55, 65, 72, 80, 85],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    fill: true,
                    tension: 0.3
                }
            ]
        };
        
        // Configuration for line chart
        const progressChartConfig = {
            type: 'line',  // Line chart type
            data: progressData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Skill Progression Over Time',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Proficiency Level'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 2000
                }
            }
        };
        
        // Create and render the progress line chart
        new Chart(progressChart, progressChartConfig);
    }
});