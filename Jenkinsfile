pipeline {
    agent any

    environment {
        NODE_PATH = "C:\\Program Files\\nodejs"
        NPM_CMD   = "C:\\Program Files\\nodejs\\npm.cmd"
        NPX_CMD   = "C:\\Program Files\\nodejs\\npx.cmd"

        PATH = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0;${env.NODE_PATH};${env.PATH}"

        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace..."
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Check Environment') {
            steps {
                echo "Checking environment variables and paths..."
                bat """
                "${env.NODE_PATH}\\node.exe" --version
                "${env.NPM_CMD}" --version
                dir "${env.CYPRESS_CACHE_FOLDER}"
                """
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat "\"${env.NPM_CMD}\" install"
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                echo "Verifying Cypress installation..."
                bat "\"${env.NPX_CMD}\" cypress verify"
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                echo "Running Cypress tests in headless mode..."
                bat "\"${env.NPX_CMD}\" cypress run --browser chrome"
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            when {
                expression { return params.RUN_GUI == true }
            }
            steps {
                echo "Running Cypress in GUI mode..."
                bat "\"${env.NPX_CMD}\" cypress open"
            }
        }

        /* -------------------------------
         *       POSTMAN API TESTS
         * ------------------------------- */
        stage('Run Postman API Tests') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    echo "Running Postman API tests using Newman..."

                    bat '''
                    "C:\\Program Files\\nodejs\\npm.cmd" install -g newman

                    rem Add global npm folder to PATH
                    set PATH=C:\\Users\\%USERNAME%\\AppData\\Roaming\\npm;%PATH%

                    rem Run Postman collection
                    newman run "Postman/Collections v2.json" ^
                        --reporters cli,junit ^
                        --reporter-junit-export newman-report.xml
                    '''
                }
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                echo "Generating Mochawesome report..."
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/results/**/*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'newman-report.xml', allowEmptyArchive: true

            junit 'newman-report.xml'

            echo "Pipeline finished. Check reports for details."
        }
    }
}