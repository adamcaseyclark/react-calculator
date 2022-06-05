#!groovy​

// PROJECT_REGISTRY_URI="491185294446.dkr.ecr.us-east-1.amazonaws.com"
PROJECT_NAME="react-calculator"
// GIT_HASH=""
// TERRAFORM_BIN_PATH="/opt/tempus/terraform/0.11.0/"
// TEAM_SLACK_CHANNEL="q"
// BUILD_URL="https://leeroy.securetempus.com/view/Q/job/ENG-Workbench/job/${env.BRANCH_NAME}/"

pipeline {
    agent any
    stages {
        stage('Git') {
            steps {
//                 checkout([
//                     $class: 'GitSCM',
//                     branches: [
//                         [
//                             name: "${env.BRANCH_NAME}"
//                         ]
//                     ],
//                     doGenerateSubmoduleConfigurations: false,
//                     extensions: [],
//                     submoduleCfg: [],
//                     userRemoteConfigs: [
//                         [
//                             url: 'git@github.com:adamcaseyclark/react-calculator.git'
//                         ]
//                     ]
//                 ])

//                 sh 'printenv'
//                 env.ENV = sh(script: 'printenv', returnStdout: true)
//                 env.GIT_HASH = sh(script: 'git rev-parse HEAD',returnStdout: true).trim()
//                 env.BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()

//                 GIT_HASH = sh(script: 'git rev-parse HEAD',returnStdout: true).trim()
//                 BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()

                sh "echo GIT_HASH is: ${GIT_COMMIT}"
                sh "echo BUILD_DATE is: ${BUILD_DATE}"
                sh "echo PROJECT_NAME is: ${PROJECT_NAME}"
//                 sh "echo PROJECT_REGISTRY_URI is: ${PROJECT_REGISTRY_URI}"
                sh "echo BRANCH_NAME is: ${GIT_BRANCH}"
                sh "echo BUILD_NUMBER is: ${BUILD_ID}"

                postBuildStatusToGithub("pending", "The build is pending!");
            }
        }
    }
}

def postBuildStatusToGithub(state, description) {
    withCredentials([string(credentialsId: 'tempuslabs-devops', variable: 'TOKEN')]) {
        sh """
            curl -XPOST -H \"Authorization: token ${TOKEN}\" https://api.github.com/repos/tempuslabs/q-workbench/statuses/${GIT_HASH} -d \"{
            \\\"state\\\": \\\"${state}\\\",
            \\\"target_url\\\": \\\"${BUILD_URL}\\\",
            \\\"description\\\": \\\"${description}\\\"
            }\"
        """
    }
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
