pipeline {
    agent any

    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        PATH = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;C:\\Program Files\\nodejs;%PATH%"
    }

    tools {
        nodejs "NodeJS"   // Name of NodeJS installation in Jenkins Global Tools
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'development', url: 'https://github.com/Arun198611/QA_Deliverables.git'
            }
        }

        stage('Check Environment') {
            steps {
                bat '''
                echo --- Checking environment variables ---
                echo CI=%CI%
                echo Cypress cache folder: %CYPRESS_CACHE_FOLDER%
                where cmd
                where node
                where npm
                dir "%CYPRESS_CACHE_FOLDER%"
                dir "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci || npm install'
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                bat '''
                IF NOT EXIST "%CYPRESS_CACHE_FOLDER%\\15.2.0\\Cypress\\Cypress.exe" (
                    echo Cypress binary not found. Installing Cypress...
                    npx cypress install
                ) ELSE (
                    echo Cypress binary already exists.
                )
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --browser chrome --record=false'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                bat 'npx mochawesome-merge cypress/reports/*.json > mochawesome.json'
                bat 'npx marge mochawesome.json --reportDir cypress/reports/html'
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
