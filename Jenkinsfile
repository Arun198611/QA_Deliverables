pipeline {
    agent any

    environment {
        CI = 'true'
        // ✅ Correct Cypress binary cache path for Windows Jenkins agent
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        PATH = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;C:\\Program Files\\nodejs;%PATH%"
    }

    tools {
        nodejs "NodeJS"  // ✅ Must match the name in Jenkins -> Manage Jenkins -> Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'development', url: 'https://github.com/Arun198611/QA_Deliverables.git'
            }
        }

        stage('Verify NodeJS Installation') {
            steps {
                // ✅ This ensures Node and NPM are accessible
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                // ✅ Use clean install for CI (faster, reproducible)
                bat 'npm ci || npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // ✅ Ensure Cypress binary installs before running
                bat 'npx cypress install'
                bat 'npx cypress verify'
                bat 'npx cypress run --browser chrome --headless'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                // ✅ Adjust path based on your report structure
                bat 'npx mochawesome-merge cypress/reports/html/.jsons/*.json > cypress/reports/mochawesome.json'
                bat 'npx marge cypress/reports/mochawesome.json --reportDir cypress/reports/html'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
        }
        failure {
            echo '❌ Tests failed! Check the HTML report for details.'
        }
        success {
            echo '✅ All tests passed successfully!'
        }
    }
}
