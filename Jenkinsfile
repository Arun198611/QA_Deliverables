pipeline {
    agent any
    options {
        shell('cmd')
    }

      environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        PATH = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;%PATH%"
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

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run in headless Chrome mode
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
