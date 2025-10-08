pipeline {
    agent any

    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        PATH = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;C:\\Program Files\\nodejs;%PATH%"
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'development', url: 'https://github.com/Arun198611/QA_Deliverables.git'
            }
        }

        // 👇 Add this stage right here
        stage('Check Environment') {
            steps {
                bat '''
                echo --- Checking environment variables ---
                echo CI=%CI%
                echo Cypress cache folder: %CYPRESS_CACHE_FOLDER%
                echo Current PATH:
                echo %PATH%
                where node
                where npm
                dir "%CYPRESS_CACHE_FOLDER%"
                dir "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --browser chrome'
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
