#!groovy​

node('jenkins-worker') {
    try {
        stage('Git') {
            checkout([
                $class: 'GitSCM',
                branches: [
                    [
                        name: "${env.BRANCH_NAME}"
                    ]
                ],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                submoduleCfg: [],
                userRemoteConfigs: [
                    [
                        url: 'git@github.com:adamcaseyclark/react-calculator.git'
                    ]
                ]
            ])

            GIT_HASH = sh(script: 'git rev-parse HEAD',returnStdout: true).trim()
            BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()

            sh "echo GIT_HASH is: ${GIT_HASH}"
            sh "echo BUILD_DATE is: ${BUILD_DATE}"
            sh "echo PROJECT_NAME is: ${PROJECT_NAME}"
            sh "echo PROJECT_REGISTRY_URI is: ${PROJECT_REGISTRY_URI}"
            sh "echo BRANCH_NAME is: ${BRANCH_NAME}"
            sh "echo BUILD_NUMBER is: ${BUILD_NUMBER}"

            postBuildStatusToGithub("pending", "The build is pending!");
        }
    }
    catch (error) {
        throw error
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
