pipeline {
    agent any

environment {
    NODE_PATH = "C:\\Program Files\\nodejs"
    NPM_GLOBAL_BIN = "C:\\Users\\aruns\\AppData\\Roaming\\npm"
    NPM_CMD   = "C:\\Program Files\\nodejs\\npm.cmd"
    NPX_CMD   = "C:\\Program Files\\nodejs\\npx.cmd"

    PATH = "${env.NPM_GLOBAL_BIN};${env.NODE_PATH};${env.PATH}"
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
stage('Run Postman Tests') {
    steps {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            echo "Running Postman API tests using Newman..."

            bat '"C:\\Program Files\\nodejs\\npm.cmd" install -g newman'

            bat 'if not exist newman mkdir newman'

            bat """
            "C:\\Users\\aruns\\AppData\\Roaming\\npm\\newman.cmd" run "Postman/Collections v2.json" ^
                -r cli,junit ^
                --reporter-junit-export newman/newman-report.xml
            """
        }
    }
}
        stage('Generate Mochawesome Report') {
            steps {
                echo "Generating Mochawesome report..."
            }
        }
    }  // ← closes stages block

    post {
        always {
            echo "Archiving Newman Reports..."
            archiveArtifacts artifacts: 'newman/*.xml', fingerprint: true
            junit 'newman/*.xml'
        }
    }
} // ← closes pipeline block
