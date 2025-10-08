pipeline {
    agent any

    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        PATH = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;C:\\Program Files\\nodejs;%PATH%"
    }

    tools {
        nodejs "NodeJS"  // Replace with the exact NodeJS tool name configured in Jenkins
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir() // Pipeline-native safe cleanup
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'development', url: 'https://github.com/Arun198611/QA_Deliverables.git'
            }
        }

        stage('Check Environment') {
            steps {
                bat """
                C:\\Windows\\System32\\cmd.exe /c echo --- Checking Environment ---
                C:\\Windows\\System32\\cmd.exe /c echo CI=%CI%
                C:\\Windows\\System32\\cmd.exe /c echo Cypress cache folder: %CYPRESS_CACHE_FOLDER%
                C:\\Windows\\System32\\cmd.exe /c where node
                C:\\Windows\\System32\\cmd.exe /c where npm
                C:\\Windows\\System32\\cmd.exe /c dir "%CYPRESS_CACHE_FOLDER%"
                """
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'C:\\Windows\\System32\\cmd.exe /c npm install'
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                bat 'C:\\Windows\\System32\\cmd.exe /c npx cypress verify'
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                bat 'C:\\Windows\\System32\\cmd.exe /c npx cypress run --browser chrome'
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            steps {
                input message: "Do you want to run Cypress in GUI mode?"
                bat 'C:\\Windows\\System32\\cmd.exe /c npx cypress open'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                bat 'C:\\Windows\\System32\\cmd.exe /c npx mochawesome-merge cypress\\reports\\*.json > mochawesome.json'
                bat 'C:\\Windows\\System32\\cmd.exe /c npx marge mochawesome.json --reportDir cypress\\reports\\html'
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
