declare module 'garmin-connect' {


  class GarminConnect {
    constructor();

    login(email?: string, password?: string): Promise<any>;


    getUserInfo(): Promise<any>;

    getSocialProfile(): Promise<any>;

    getSocialConnections(): Promise<any>;

    getDeviceInfo(): Promise<any>;

    getActivities(start?: number, limit?: number): Promise<any>;

    getActivity({ activityId }: { activityId: string }): Promise<any>

    getNewsFeed(start?: number, limit?: number): Promise<any>


    downloadOriginalActivityData({ activityId }: { activityId: string }, directoryPath?: string): Promise<any>


    getSteps(date?: Date): Promise<any>

    getHeartRate(date?: Date): Promise<any>

    getSleep(date?: Date): Promise<any>

    getSleepData(date?: Date): Promise<any>

  }

  export { GarminConnect }
}