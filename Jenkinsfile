#!groovy​

PROJECT_NAME="react-calculator"
GIT_HASH=""
BRANCH_NAME="master"
BRANCH_DATE=""
// BUILD_URL="${EXPOSED_URL}/job/${PROJECT_NAME}/${BRANCH_NAME}/"

pipeline {
    agent any
    stages {
        stage('Git') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [
                        [
                            name: "master"
                        ]
                    ],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [
                        [
                            credentialsId: 'github-credentials',
                            url: 'https://github.com/adamcaseyclark/react-calculator.git'
                        ]
                    ]
                ])

                sh "ls -ltr"
                sh "git rev-parse HEAD"
                sh "echo GIT_COMMIT is ${GIT_COMMIT}"
                sh "date -u"
                sh "echo env.BUILD_URL is ${env.BUILD_URL}"

                BUILD_DATE = """${sh(
                                returnStdout: true,
                                script: 'echo "date -u"'
                            )}"""

//                 GIT_HASH = sh(script: 'git rev-parse HEAD',returnStdout: true).trim()
//                 BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()

                sh "echo GIT_HASH is: ${GIT_COMMIT}"
                sh "echo BUILD_DATE is: ${BUILD_DATE}"
                sh "echo PROJECT_NAME is: ${PROJECT_NAME}"
//                 sh "echo PROJECT_REGISTRY_URI is: ${PROJECT_REGISTRY_URI}"
                sh "echo BRANCH_NAME is: ${BRANCH_NAME}"
                sh "echo BUILD_NUMBER is: ${BUILD_NUMBER}"

                postBuildStatusToGithub("pending", "The build is pending!");
            }
        }
    }
}

def postBuildStatusToGithub(state, description) {
    sh """
        curl -XPOST -H \"Authorization: ${CREDENTIALS_ID}\" https://api.github.com/repos/adamcaseyclark/react-calculator/statuses/${GIT_COMMIT} -d \"{
        \\\"state\\\": \\\"${state}\\\",
        \\\"target_url\\\": \\\"${BUILD_URL}\\\",
        \\\"description\\\": \\\"${description}\\\"
        }\"
    """
}

def getPreviousSuccess(build) {
    if (build != null) {
        if (build.result.toString() == 'SUCCESS') {
            return build
        }
        else {
            return getPreviousSuccess(build.getPreviousBuild())
        }
    }
    else {
        return null
    }
}

def getLastBuildHash(jobName) {
    def lastBuild = Jenkins.instance.getItemByFullName(jobName).lastBuild
    def lastSuccessfulBuild = getPreviousSuccess(lastBuild)
    def lastBuildScm = lastSuccessfulBuild?.actions.find { action -> action instanceof jenkins.scm.api.SCMRevisionAction }
    return lastBuildScm?.revision?.hash
}
